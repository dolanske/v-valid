import { describe, expect, it } from 'vitest'
import { computed, nextTick, reactive, ref } from 'vue'
import {
  createRule,
  decimal,
  defineRules,
  email,
  maxLength,
  minLength,
  required,
  useValidation,
  validateIf,
} from '../../src'

const tick = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))

describe('[core] useValidation', () => {
  it('resolves with a boolean instead of rejecting', async () => {
    const form = reactive({ name: '' })
    const { validate, errors, anyError, validated } = useValidation(form, { name: { required } })

    expect(validated.value).toBe(false)
    expect(await validate()).toBe(false)
    expect(anyError.value).toBe(true)
    expect(validated.value).toBe(true)
    expect(errors.value.name).toEqual({
      id: 'name',
      path: 'name',
      value: '',
      invalid: true,
      errors: { required: 'Value is required' },
      messages: ['Value is required'],
    })

    form.name = 'Jane'
    expect(await validate()).toBe(true)
    expect(anyError.value).toBe(false)
    expect(errors.value.name.invalid).toBe(false)
    expect(errors.value.name.value).toBe('Jane')
  })

  it('scaffolds the error object from the form before validating', () => {
    const form = reactive({ a: 1, nested: { b: '', c: [1] } })
    const { errors } = useValidation(form, {})

    expect(errors.value.a.invalid).toBe(false)
    expect(errors.value.nested.b.path).toBe('nested.b')
    expect(errors.value.nested.c.id).toBe('c')
  })

  it('validates deeply nested forms (4+ levels)', async () => {
    const form = reactive({ a: { b: { c: { d: '' } } } })
    const { validate, errors } = useValidation(form, { a: { b: { c: { d: { required } } } } })

    expect(await validate()).toBe(false)
    expect(errors.value.a.b.c.d.invalid).toBe(true)
    expect(errors.value.a.b.c.d.path).toBe('a.b.c.d')
  })

  it('collects every failing rule in order', async () => {
    const form = reactive({ first: 10.5, nested: { foo: 'Hello', bar: [1, 2, 3, 4, 5] } })
    const rules = defineRules<typeof form>({
      first: { decimal },
      nested: {
        foo: { minLength: minLength(6), email },
        bar: { maxLength: maxLength(3) },
      },
    })

    const { validate, errors } = useValidation(form, rules)

    expect(await validate()).toBe(false)
    expect(errors.value.first.invalid).toBe(false)
    expect(errors.value.nested.foo.messages).toEqual([
      'Value must have a length of at least 6',
      'Value must be a valid email address',
    ])
    expect(errors.value.nested.bar.errors.maxLength).toBe('Value must have a length of at most 3')
  })

  it('accepts rules as arrays keyed by rule name', async () => {
    const form = reactive({ name: '', info: { contact: 'nope' } })
    const { validate, errors } = useValidation(form, {
      name: [required, maxLength(3)],
      info: { contact: [required, email] },
    })

    expect(await validate()).toBe(false)
    expect(Object.keys(errors.value.name.errors)).toEqual(['required'])
    expect(Object.keys(errors.value.info.contact.errors)).toEqual(['email'])
  })

  it('suffixes duplicate rule names in arrays with their index', async () => {
    const form = reactive({ name: 'x' })
    const { validate, errors } = useValidation(form, { name: [minLength(2), minLength(3)] })

    await validate()
    expect(Object.keys(errors.value.name.errors)).toEqual(['minLength', 'minLength1'])
  })

  it('treats Map, Set, Date and arrays as single values', async () => {
    const form = reactive({
      map: new Map(),
      set: new Set([1]),
      date: new Date('invalid'),
      list: [] as number[],
    })
    const { validate, errors } = useValidation(form, {
      map: { required },
      set: { required },
      date: { required },
      list: { required },
    })

    expect(await validate()).toBe(false)
    expect(errors.value.map.invalid).toBe(true)
    expect(errors.value.set.invalid).toBe(false)
    expect(errors.value.date.invalid).toBe(true)
    expect(errors.value.list.invalid).toBe(true)
  })

  it('can validate a nested object as a whole', async () => {
    const form = reactive({ address: { street: '', city: '' } })
    const { validate, errors } = useValidation(form, { address: { minLength: minLength(3) } })

    expect(await validate()).toBe(false)
    expect((errors.value.address as any).errors.minLength).toBeDefined()
  })

  it('validates rules whose field is missing from the form', async () => {
    const form = reactive<{ name?: string }>({})
    const { validate, errors } = useValidation(form, { name: { required } })

    expect(await validate()).toBe(false)
    expect(errors.value.name.value).toBeUndefined()
    expect(errors.value.name.invalid).toBe(true)
  })

  it('throws a helpful error for values which are not rules', async () => {
    const form = reactive({ name: '', other: '' })

    await expect(useValidation(form, { name: { required: 'yes' as any } }).validate())
      .rejects
      .toThrow('[v-valid] Invalid rule at "name.required": expected a validation rule or nested rules, got type string')

    await expect(useValidation(form, { name: { required, other: Promise.resolve(required) as any } }).validate())
      .rejects
      .toThrow('[v-valid] Invalid rule at "name.other": expected a validation rule, got a Promise')
  })

  it('skips falsy entries so rules can be left out conditionally', async () => {
    const form = reactive({ name: '', needsEmail: false })
    const { validate, errors } = useValidation(form, () => ({
      name: { required, email: form.needsEmail && email, other: undefined },
    }))

    expect(await validate()).toBe(false)
    expect(Object.keys(errors.value.name.errors)).toEqual(['required'])

    form.needsEmail = true
    await validate()
    expect(Object.keys(errors.value.name.errors)).toEqual(['required', 'email'])
  })

  it('reads rules from a computed', async () => {
    const form = reactive({ a: 'abc' })
    const min = ref(2)
    const rules = computed(() => ({ a: { minLength: minLength(min) } }))
    const { validate, errors } = useValidation(form, rules)

    expect(await validate()).toBe(true)
    min.value = 10
    expect(await validate()).toBe(false)
    expect(errors.value.a.errors.minLength).toBe('Value must have a length of at least 10')
  })

  it('reads rules from a getter', async () => {
    const form = reactive({ a: 'abc', strict: false })
    const { validate } = useValidation(form, () => ({
      a: { minLength: form.strict && minLength(10) },
    }))

    expect(await validate()).toBe(true)
    form.strict = true
    expect(await validate()).toBe(false)
  })

  it('accepts the form as a ref', async () => {
    const form = ref({ a: '' })
    const { validate, errors } = useValidation(form, { a: { required } })

    expect(await validate()).toBe(false)
    form.value = { a: 'filled' }
    expect(await validate()).toBe(true)
    expect(errors.value.a.value).toBe('filled')
  })

  describe('partial validation', () => {
    const setup = () => {
      const form = reactive({ name: '', info: { contact: '', age: 5 } })
      return useValidation(form, {
        name: { required },
        info: { contact: { required }, age: { minLength: minLength(1) } },
      })
    }

    it('only validates the given paths', async () => {
      const { validate, errors } = setup()

      expect(await validate('name')).toBe(false)
      expect(errors.value.name.invalid).toBe(true)
      expect(errors.value.info.contact.invalid).toBe(false)
    })

    it('keeps the previous results of other fields', async () => {
      const { validate, errors, anyError } = setup()

      await validate()
      expect(errors.value.name.invalid).toBe(true)
      expect(errors.value.info.contact.invalid).toBe(true)

      await validate('info.age')
      expect(errors.value.name.invalid).toBe(true)
      expect(errors.value.info.contact.invalid).toBe(true)
      expect(errors.value.info.age.invalid).toBe(true)
      expect(anyError.value).toBe(true)
    })

    it('accepts parent paths', async () => {
      const { validate, errors } = setup()

      expect(await validate('info')).toBe(false)
      expect(errors.value.name.invalid).toBe(false)
      expect(errors.value.info.contact.invalid).toBe(true)
      expect(errors.value.info.age.invalid).toBe(true)
    })
  })

  describe('bail', () => {
    it('stops at the first failing rule per field', async () => {
      const form = reactive({ name: '' })
      const { validate, errors } = useValidation(form, {
        name: { required, minLength: minLength(3), email },
      }, { bail: true })

      expect(await validate()).toBe(false)
      expect(errors.value.name.messages).toEqual(['Value is required'])
    })

    it('does not run later rules at all', async () => {
      let ran = false
      const spy = createRule(() => {
        ran = true
        return true
      })
      const form = reactive({ name: '' })
      const { validate } = useValidation(form, { name: [required, spy] }, { bail: true })

      await validate()
      expect(ran).toBe(false)
    })
  })

  describe('async', () => {
    it('runs fields and rules in parallel', async () => {
      const slow = createRule(() => tick(60).then(() => false), 'slow')
      const form = reactive({ a: '', b: '', c: '' })
      const { validate, errors } = useValidation(form, {
        a: [slow, slow, slow],
        b: [slow],
        c: [slow],
      })

      const start = performance.now()
      expect(await validate()).toBe(false)
      const elapsed = performance.now() - start

      expect(elapsed).toBeLessThan(180)
      expect(errors.value.a.messages).toEqual(['slow', 'slow', 'slow'])
    })

    it('exposes pending while validating', async () => {
      const slow = createRule(() => tick(20).then(() => true))
      const form = reactive({ a: '' })
      const { validate, pending } = useValidation(form, { a: { slow } })

      const run = validate()
      expect(pending.value).toBe(true)
      await run
      expect(pending.value).toBe(false)
    })

    it('ignores results of a superseded run', async () => {
      const form = reactive({ a: '' })
      const slow = createRule(() => tick(40).then(() => false), 'slow failure')
      const { validate, errors, anyError } = useValidation(form, { a: [slow] })

      const first = validate()
      form.a = 'changed'
      const second = validate('a')

      await Promise.all([first, second])
      expect(errors.value.a.value).toBe('changed')
      expect(anyError.value).toBe(true)
    })

    it('does not apply results if reset() ran in the meantime', async () => {
      const form = reactive({ a: '' })
      const slow = createRule(() => tick(20).then(() => false))
      const { validate, errors, anyError, validated, reset } = useValidation(form, { a: [slow] })

      const run = validate()
      reset()
      await run

      expect(errors.value.a.invalid).toBe(false)
      expect(anyError.value).toBe(false)
      expect(validated.value).toBe(false)
    })

    it('propagates exceptions thrown by rules and resets pending', async () => {
      const boom = createRule(() => {
        throw new Error('boom')
      })
      const form = reactive({ a: '' })
      const { validate, pending } = useValidation(form, { a: { boom } })

      await expect(validate()).rejects.toThrow('boom')
      expect(pending.value).toBe(false)
    })
  })

  describe('options', () => {
    it('proactive: validates on form change without unhandled rejections', async () => {
      const form = reactive({ a: '' })
      const rejections: unknown[] = []
      const handler = (reason: unknown) => rejections.push(reason)
      process.on('unhandledRejection', handler)

      const { errors, validated } = useValidation(form, { a: { required } }, { proactive: true })

      expect(validated.value).toBe(false)
      form.a = 'x'
      await nextTick()
      await tick()
      expect(validated.value).toBe(true)
      expect(errors.value.a.invalid).toBe(false)

      form.a = ''
      await nextTick()
      await tick()
      expect(errors.value.a.invalid).toBe(true)

      process.off('unhandledRejection', handler)
      expect(rejections).toEqual([])
    })

    it('proactive: re-validates when the rules object changes', async () => {
      const form = reactive({ a: 'abc' })
      const strict = ref(false)
      const rules = computed(() => ({ a: { minLength: minLength(strict.value ? 10 : 1) } }))
      const { errors } = useValidation(form, rules, { proactive: true })

      strict.value = true
      await nextTick()
      await tick()
      expect(errors.value.a.invalid).toBe(true)
    })

    it('proactive: re-validates when a ref used by a rule changes', async () => {
      const form = reactive({ a: 'abc', b: '' })
      const min = ref(1)
      const flag = ref(false)
      const { errors } = useValidation(form, {
        a: { minLength: minLength(min) },
        b: { required: validateIf(flag, required) },
      }, { proactive: true })

      min.value = 10
      await nextTick()
      await tick()
      expect(errors.value.a.invalid).toBe(true)
      expect(errors.value.b.invalid).toBe(false)

      flag.value = true
      await nextTick()
      await tick()
      expect(errors.value.b.invalid).toBe(true)
    })

    it('autoclear: clears errors on the first change after validation', async () => {
      const form = reactive({ a: '' })
      const { validate, errors, anyError, validated } = useValidation(form, { a: { required } }, { autoclear: true })

      await validate()
      expect(errors.value.a.invalid).toBe(true)

      form.a = 'x'
      await nextTick()
      expect(errors.value.a.invalid).toBe(false)
      expect(anyError.value).toBe(false)
      expect(validated.value).toBe(false)
    })
  })

  describe('addError', () => {
    it('adds an error, message and marks the form invalid', async () => {
      const form = reactive({ first: 5, second: 'ok' })
      const { validate, errors, anyError, addError } = useValidation(form, { second: { required } })

      expect(await validate()).toBe(true)

      addError('second', { key: 'taken', message: 'Already taken' })
      expect(anyError.value).toBe(true)
      expect(errors.value.second.invalid).toBe(true)
      expect(errors.value.second.errors.taken).toBe('Already taken')
      expect(errors.value.second.messages).toEqual(['Already taken'])
    })

    it('replaces the message when the same key is added twice', async () => {
      const form = reactive({ a: '' })
      const { errors, addError } = useValidation(form, {})

      addError('a', { key: 'server', message: 'first' })
      addError('a', { key: 'server', message: 'second' })
      expect(errors.value.a.messages).toEqual(['second'])
    })

    it('is reactive', async () => {
      const form = reactive({ a: '' })
      const { errors, addError } = useValidation(form, {})
      const invalid = computed(() => errors.value.a.invalid)

      expect(invalid.value).toBe(false)
      addError('a', { key: 'x', message: 'y' })
      expect(invalid.value).toBe(true)
    })
  })

  it('reset() clears everything', async () => {
    const form = reactive({ a: '' })
    const { validate, reset, errors, anyError, validated } = useValidation(form, { a: { required } })

    await validate()
    reset()

    expect(errors.value.a.invalid).toBe(false)
    expect(errors.value.a.messages).toEqual([])
    expect(anyError.value).toBe(false)
    expect(validated.value).toBe(false)
  })

  it('produces identical results when validating repeatedly', async () => {
    const form = reactive({ first: 5 })
    const { validate, errors } = useValidation(form, { first: { minLength: minLength(1) } })

    await validate()
    const first = JSON.stringify(errors.value)
    await nextTick()
    await validate()
    expect(JSON.stringify(errors.value)).toBe(first)
  })
})
