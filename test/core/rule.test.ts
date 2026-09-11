import { describe, expect, it } from 'vitest'
import { reactive, ref } from 'vue'
import { createRule, createRuleArg, defineRules, maxLength, minLength, required, skip, useValidation } from '../../src'
import { isArray, isNil, isString } from '../../src/utils'

describe('[core] createRule', () => {
  it('uses a default label and name', async () => {
    const rule = createRule(value => !isNil(value))

    expect(rule.name).toBe('custom')
    expect(rule.validate(null)).toBe(false)
    expect(rule.label(null, undefined)).toBe('Value does not satisfy the validation rule.')
  })

  it('accepts a string or callback label and a name', () => {
    const asString = createRule(value => !isNil(value), 'huh?', 'present')
    const asCallback = createRule(isString, value => `Value must be a string. Value is <${typeof value}>`)

    expect(asString.name).toBe('present')
    expect(asString.label(null, undefined)).toBe('huh?')
    expect(asCallback.label(100, undefined)).toBe('Value must be a string. Value is <number>')
  })

  it('treats a returned string as a failure message', async () => {
    const rule = createRule(value => value > 5 || `${value} is too small`, 'unused')
    const form = reactive({ a: 3 })
    const { validate, errors } = useValidation(form, { a: { rule } })

    await validate()
    expect(errors.value.a.errors.rule).toBe('3 is too small')
  })

  it('supports async rules', async () => {
    const rule = createRule(() => new Promise<boolean>(resolve => setTimeout(() => resolve(false), 30)))
    const form = reactive({ value: 'nothing' })
    const { validate, errors } = useValidation(form, { value: { rule } })

    const start = performance.now()
    expect(await validate()).toBe(false)
    expect(performance.now() - start).toBeGreaterThanOrEqual(25)
    expect(errors.value.value.errors.rule).toBe('Value does not satisfy the validation rule.')
  })

  it('exposes .skip()', () => {
    const rule = createRule(() => false)
    expect(rule.skipped).toBeUndefined()
    expect(rule.skip().skipped).toBe(true)
  })
})

describe('[core] createRuleArg', () => {
  const arrayBetween = createRuleArg<{ min: number, max: number }>(
    (value, { min, max }) => isArray(value) && value.length >= min && value.length <= max,
    (value, { min, max }) => `Value <${value}> must be an array and between ${min} and ${max} in length.`,
    'arrayBetween',
  )

  it('passes parameters to validate and label', async () => {
    const form = reactive({ first: [1, 2, 3, 4], second: [1, 2, 3, 4, 5, 6], third: 'Hello' })
    const { validate, errors } = useValidation(form, {
      first: { range: arrayBetween({ min: 5, max: 20 }) },
      second: { range: arrayBetween({ min: 5, max: 20 }) },
      third: { range: arrayBetween({ min: 5, max: 20 }) },
    })

    expect(await validate()).toBe(false)
    expect(errors.value.first.errors.range).toBe('Value <1,2,3,4> must be an array and between 5 and 20 in length.')
    expect(errors.value.second.invalid).toBe(false)
    expect(errors.value.third.invalid).toBe(true)
  })

  it('resolves refs and getters inside the parameters on every run', () => {
    const min = ref(1)
    const rule = arrayBetween({ min, max: () => min.value + 1 } as any)

    expect(rule.validate([1])).toBe(true)
    min.value = 3
    expect(rule.validate([1])).toBe(false)
    expect(rule.validate([1, 2, 3, 4])).toBe(true)
    expect(rule.params?.()).toEqual({ min: 3, max: 4 })
  })

  it('exposes .skip(params)', () => {
    expect(arrayBetween.skip({ min: 1, max: 2 }).skipped).toBe(true)
  })
})

describe('[core] skip', () => {
  it('skipped rules never run and never fail', async () => {
    const form = reactive({ a: '' })
    const { validate, errors } = useValidation(form, {
      a: {
        required: required.skip(),
        minLength: minLength.skip(5),
        maxLength: skip(maxLength(0)),
      },
    })

    expect(await validate()).toBe(true)
    expect(errors.value.a.errors).toEqual({})
  })

  it('does not mutate the original rule', () => {
    const rule = minLength(1)
    skip(rule)
    expect(rule.skipped).toBeUndefined()
  })
})

describe('[core] defineRules', () => {
  it('returns the rules untouched', () => {
    const rules = defineRules<{ name: string, nested: { deeper: { age: number } } }>({
      name: [required, maxLength(64)],
      nested: { deeper: { age: { required } } },
    })

    expect(isArray((rules as any).name)).toBe(true)
    expect((rules as any).nested.deeper.age.required).toBe(required)
  })
})
