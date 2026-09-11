import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { and, between, createRule, email, maxLength, not, or, required, useValidation } from '../../src'

const asyncFalse = createRule(() => Promise.resolve(false), 'async failed')

describe('[helpers] and', () => {
  it('passes only when every rule passes', async () => {
    const rule = and(not(email), between(2, 100))
    expect(await rule.validate(10)).toBe(true)
    expect(await rule.validate(200)).not.toBe(true)
  })

  it('reports the message of the first failing rule', async () => {
    const form = reactive({ a: '' })
    const { validate, errors } = useValidation(form, { a: { all: and(required, email) } })

    await validate()
    expect(errors.value.a.errors.all).toBe('Value is required')
  })

  it('short-circuits', () => {
    let ran = false
    const spy = createRule(() => {
      ran = true
      return true
    })
    expect(and(required, spy).validate('')).toBe('Value is required')
    expect(ran).toBe(false)
  })

  it('stays synchronous for synchronous rules and awaits async ones', async () => {
    expect(and(required).validate('x')).toBe(true)
    const result = and(required, asyncFalse).validate('x')
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toBe('async failed')
  })

  it('ignores skipped rules', () => {
    expect(and(required.skip()).validate('')).toBe(true)
  })

  it('has .skip', () => {
    expect(and.skip(required).skipped).toBe(true)
  })
})

describe('[helpers] or', () => {
  const rule = or(email, between(10, 100))

  it('passes when at least one rule passes', async () => {
    expect(rule.validate('blumf@gmail.com')).toBe(true)
    expect(rule.validate(50)).toBe(true)
    expect(rule.validate(1)).toBe(false)
  })

  it('uses its own label', async () => {
    const form = reactive({ a: 1 })
    const { validate, errors } = useValidation(form, { a: { either: rule } })
    await validate()
    expect(errors.value.a.errors.either).toBe('Value must pass at least one of the checks')
  })

  it('handles async rules', async () => {
    expect(await or(asyncFalse, required).validate('x')).toBe(true)
    expect(await or(asyncFalse, asyncFalse).validate('x')).toBe(false)
  })
})

describe('[helpers] not', () => {
  it('inverts a single rule', () => {
    expect(not(between(15, 20)).validate(10)).toBe(true)
    expect(not(between(15, 20)).validate(16)).toBe(false)
    expect(not(maxLength(5)).validate('Hello world')).toBe(true)
  })

  it('passes only when every rule fails', () => {
    // 50 is not an email but is between 0 and 100 -> one rule passes -> fail
    expect(not(email, between(0, 100)).validate(50)).toBe(false)
    expect(not(email, between(0, 100)).validate(500)).toBe(true)
  })

  it('handles async rules', async () => {
    expect(await not(asyncFalse).validate('x')).toBe(true)
  })

  it('has .skip', () => {
    expect(typeof not.skip).toBe('function')
    expect(not.skip(email).skipped).toBe(true)
  })
})
