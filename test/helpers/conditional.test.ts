import { describe, expect, it } from 'vitest'
import { reactive, ref } from 'vue'
import { decimal, minLength, optional, required, url, useValidation, validateIf, validateIfNot } from '../../src'

describe('[helpers] validateIf', () => {
  it('runs the rule when a boolean condition is true', async () => {
    const form = reactive({ field: [1, 2] })
    const { validate, errors } = useValidation(form, {
      field: {
        minLength: validateIf(true, minLength(5)),
        maxLength: validateIf(false, minLength(5)),
      },
    })

    expect(await validate()).toBe(false)
    expect(errors.value.field.errors.minLength).toBeDefined()
    expect(errors.value.field.errors.maxLength).toBeUndefined()
  })

  it('evaluates getters lazily, on every validation', async () => {
    const form = reactive({ value: 'x', flag: false })
    // Plain object rules, no computed needed
    const { validate, errors } = useValidation(form, {
      value: { min: validateIf(() => form.flag, minLength(5)) },
    })

    expect(await validate()).toBe(true)
    form.flag = true
    expect(await validate()).toBe(false)
    expect(errors.value.value.errors.min).toBe('Value must have a length of at least 5')
  })

  it('accepts refs', () => {
    const flag = ref(false)
    const rule = validateIf(flag, required)
    expect(rule.validate('')).toBe(true)
    flag.value = true
    expect(rule.validate('')).toBe(false)
  })

  it('accepts promises and async getters', async () => {
    expect(await validateIf(Promise.resolve(true), required).validate('')).toBe(false)
    expect(await validateIf(Promise.resolve(false), required).validate('')).toBe(true)
    expect(await validateIf(async () => true, required).validate('')).toBe(false)
  })

  it('keeps the wrapped rule name, params and label', () => {
    const rule = validateIf(true, minLength(3))
    expect(rule.name).toBe('minLength')
    expect(rule.params?.()).toEqual({ min: 3 })
    expect(rule.label('', rule.params?.())).toBe('Value must have a length of at least 3')
  })
})

describe('[helpers] validateIfNot', () => {
  it('runs the rule when the condition is false', async () => {
    const form = reactive({ first: 'Hello world', second: [1, 2, 3, 4] })
    const { validate, errors } = useValidation(form, {
      first: { shouldValidate: validateIfNot(false, decimal) },
      second: { shouldNotValidate: validateIfNot(() => typeof form.first === 'string', minLength(10)) },
    })

    expect(await validate()).toBe(false)
    expect(errors.value.first.invalid).toBe(true)
    expect(errors.value.second.invalid).toBe(false)
  })
})

describe('[helpers] optional', () => {
  it('passes empty values and validates the rest', () => {
    const rule = optional(url)
    expect(rule.validate(undefined)).toBe(true)
    expect(rule.validate(null)).toBe(true)
    expect(rule.validate('')).toBe(true)
    expect(rule.validate('https://example.com')).toBe(true)
    expect(rule.validate('not a url')).toBe(false)
  })

  it('combines several rules', () => {
    const rule = optional(url, minLength(30))
    expect(rule.validate('')).toBe(true)
    expect(rule.validate('https://example.com')).toBe('Value must have a length of at least 30')
  })

  it('keeps the wrapped rule name', () => {
    expect(optional(url).name).toBe('url')
    expect(optional(url, minLength(1)).name).toBe('and')
  })
})
