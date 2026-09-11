import { describe, expect, expectTypeOf, it } from 'vitest'
import { reactive, ref } from 'vue'
import type { ErrorsFor, Path, RulesFor, ValidationError } from '../../src'
import { defineRules, email, minLength, required, useValidation } from '../../src'

/**
 * These tests exist for the type checker (`npm run typecheck`). The runtime
 * assertions are trivial on purpose.
 */

interface Form {
  name: string
  age: number | null
  tags: string[]
  birthday: Date
  info: {
    contact: string
    address?: { street: string }
  }
}

describe('[types]', () => {
  it('rulesFor catches typos and accepts arrays, groups and nested objects', () => {
    const rules = defineRules<Form>({
      name: [required, minLength(2)],
      age: { required },
      tags: { required, minLength: minLength(1) },
      birthday: { required },
      info: {
        contact: { required, email },
        address: { street: { required } },
      },
    })

    defineRules<Form>({
      // @ts-expect-error unknown key
      nmae: { required },
    })

    defineRules<Form>({
      // @ts-expect-error value must be a rule
      name: { required: 'yes' },
    })

    defineRules<Form>({
      info: {
        // @ts-expect-error unknown nested key
        contacts: { required },
      },
    })

    expect(rules).toBeTruthy()
  })

  it('rulesFor allows a group on a nested object', () => {
    const rules: RulesFor<Form> = { info: { required } }
    expect(rules).toBeTruthy()
  })

  it('errorsFor mirrors the form', () => {
    type Errors = ErrorsFor<Form>
    expectTypeOf<Errors['name']>().toEqualTypeOf<ValidationError>()
    expectTypeOf<Errors['age']>().toEqualTypeOf<ValidationError>()
    expectTypeOf<Errors['tags']>().toEqualTypeOf<ValidationError>()
    expectTypeOf<Errors['birthday']>().toEqualTypeOf<ValidationError>()
    expectTypeOf<Errors['info']['contact']>().toEqualTypeOf<ValidationError>()
    expectTypeOf<Errors['info']['address']['street']>().toEqualTypeOf<ValidationError>()
    expect(true).toBe(true)
  })

  it('path lists every dotted path', () => {
    expectTypeOf<Path<Form>>().toEqualTypeOf<
      'name' | 'age' | 'tags' | 'birthday' | 'info' | 'info.contact' | 'info.address' | 'info.address.street'
    >()
    expect(true).toBe(true)
  })

  it('useValidation infers the form type from reactive objects and refs', async () => {
    const form = reactive<Form>({ name: '', age: null, tags: [], birthday: new Date(), info: { contact: '' } })
    const { errors, validate, addError } = useValidation(form, { name: { required } })

    expectTypeOf(errors.value.info.contact).toEqualTypeOf<ValidationError>()
    expect(errors.value.info.contact.path).toBe('info.contact')

    await validate('info.contact', 'name')
    // @ts-expect-error unknown path
    validate('info.nope')
    // @ts-expect-error unknown path
    addError('nope', { key: 'k', message: 'm' })

    const asRef = ref({ value: 'has a key named value' })
    const ctx = useValidation(asRef, { value: { required } })
    expect(ctx.errors.value.value.id).toBe('value')

    const plainWithValueKey = reactive({ value: '' })
    const ctx2 = useValidation(plainWithValueKey, { value: { required } })
    expect(ctx2.errors.value.value.id).toBe('value')
  })
})
