import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { maxLenNoSpace, maxLength, minLenNoSpace, minLength } from '../../src'

describe('[validators] minLength', () => {
  it('validates strings, arrays, Maps, Sets and objects', () => {
    expect(minLength(1).validate([])).toBe(false)
    expect(minLength(1).validate(new Set())).toBe(false)
    expect(minLength(1).validate(new Map())).toBe(false)
    expect(minLength(1).validate({})).toBe(false)
    expect(minLength(1).validate('')).toBe(false)
    expect(minLength(1).validate(null)).toBe(false)
    expect(minLength(1).validate(123)).toBe(false)

    expect(minLength(1).validate(['one', 'two'])).toBe(true)
    expect(minLength(1).validate(new Set(['one', 'two']))).toBe(true)
    expect(minLength(1).validate(new Map([[1, 'one'], [2, 'two']]))).toBe(true)
    expect(minLength(1).validate({ one: 1, two: 2 })).toBe(true)
    expect(minLength(1).validate('one')).toBe(true)
  })

  it('stays reactive to refs and getters', () => {
    const min = ref(2)
    const rule = minLength(min)
    expect(rule.validate('abc')).toBe(true)
    min.value = 10
    expect(rule.validate('abc')).toBe(false)
    expect(rule.label('abc', rule.params?.())).toBe('Value must have a length of at least 10')

    expect(minLength(() => min.value).validate('abc')).toBe(false)
  })

  it('has .skip', () => {
    expect(minLength.skip(1).skipped).toBe(true)
    expect(minLength(1).skipped).toBeUndefined()
  })
})

describe('[validators] maxLength', () => {
  it('validates strings, arrays, Maps, Sets and objects', () => {
    expect(maxLength(1).validate([])).toBe(true)
    expect(maxLength(1).validate(new Set())).toBe(true)
    expect(maxLength(1).validate(new Map())).toBe(true)
    expect(maxLength(1).validate({})).toBe(true)
    expect(maxLength(1).validate('a')).toBe(true)

    expect(maxLength(1).validate(['one', 'two'])).toBe(false)
    expect(maxLength(1).validate(new Set(['one', 'two']))).toBe(false)
    expect(maxLength(1).validate(new Map([[1, 'one'], [2, 'two']]))).toBe(false)
    expect(maxLength(1).validate({ one: 1, two: 2 })).toBe(false)
    expect(maxLength(1).validate('one')).toBe(false)
    expect(maxLength(1).validate(null)).toBe(false)
  })

  it('stays reactive to refs', () => {
    const max = ref(5)
    const rule = maxLength(max)
    expect(rule.validate('abc')).toBe(true)
    max.value = 2
    expect(rule.validate('abc')).toBe(false)
  })
})

describe('[validators] minLenNoSpace', () => {
  it('ignores whitespace', () => {
    expect(minLenNoSpace(7).validate('A B C D E F')).toBe(false)
    expect(minLenNoSpace(7).validate('A B C D E F G')).toBe(true)
    expect(minLenNoSpace(1).validate('   \t ')).toBe(false)
    expect(minLenNoSpace(0).validate('')).toBe(true)
    expect(minLenNoSpace(1).validate(5)).toBe(false)
  })

  it('labels', () => {
    const rule = minLenNoSpace(3)
    expect(rule.label('a', rule.params?.())).toBe('Value must have a length of at least 3 excluding spaces')
    expect(rule.label(1, rule.params?.())).toBe('Value must be a string')
  })
})

describe('[validators] maxLenNoSpace', () => {
  it('ignores whitespace', () => {
    expect(maxLenNoSpace(5).validate('H e l l 0')).toBe(true)
    expect(maxLenNoSpace(5).validate('Bummer')).toBe(false)
    expect(maxLenNoSpace(5).validate('')).toBe(true)
    expect(maxLenNoSpace(5).validate(null)).toBe(false)
  })

  it('labels', () => {
    const rule = maxLenNoSpace(3)
    expect(rule.label('a', rule.params?.())).toBe('Value must have a length of at most 3 excluding spaces')
    expect(rule.label(1, rule.params?.())).toBe('Value must be a string')
  })
})
