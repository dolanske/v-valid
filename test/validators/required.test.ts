import { describe, expect, it } from 'vitest'
import { required } from '../../src'

describe('[validators] required', () => {
  it('fails for empty values', () => {
    expect(required.validate('')).toBe(false)
    expect(required.validate(null)).toBe(false)
    expect(required.validate(undefined)).toBe(false)
    expect(required.validate({})).toBe(false)
    expect(required.validate([])).toBe(false)
    expect(required.validate(new Set())).toBe(false)
    expect(required.validate(new Map())).toBe(false)
    expect(required.validate(Number.NaN)).toBe(false)
    expect(required.validate(new Date('garbage'))).toBe(false)
  })

  it('passes for present values', () => {
    expect(required.validate('test')).toBe(true)
    expect(required.validate(0)).toBe(true)
    expect(required.validate(false)).toBe(true)
    expect(required.validate(true)).toBe(true)
    expect(required.validate(new Date())).toBe(true)
    expect(required.validate({ foo: 'bar' })).toBe(true)
    expect(required.validate(['test'])).toBe(true)
    expect(required.validate(new Set('test'))).toBe(true)
    expect(required.validate(new Map([['foo', 'bar']]))).toBe(true)
  })

  it('has .skip', () => {
    expect(required.skip().skipped).toBe(true)
    expect(required.skipped).toBeUndefined()
  })
})
