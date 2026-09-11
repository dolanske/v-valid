import { describe, expect, it } from 'vitest'
import { reactive, ref } from 'vue'
import { getIn, isEmpty, isPathPrefix, isPlainObject, setIn, sizeOf, toValue } from '../../src/utils'

describe('[utils] type guards', () => {
  it('isPlainObject', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(Object.create(null))).toBe(true)
    expect(isPlainObject(reactive({}))).toBe(true)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
    expect(isPlainObject(new Map())).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(() => {})).toBe(false)
  })

  it('isEmpty', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
    expect(isEmpty(Number.NaN)).toBe(true)
    expect(isEmpty(new Date('nope'))).toBe(true)

    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty(true)).toBe(false)
    expect(isEmpty('a')).toBe(false)
    expect(isEmpty(new Date())).toBe(false)
    expect(isEmpty([0])).toBe(false)
  })

  it('sizeOf', () => {
    expect(sizeOf('abc')).toBe(3)
    expect(sizeOf([1])).toBe(1)
    expect(sizeOf(new Set([1, 2]))).toBe(2)
    expect(sizeOf(new Map([[1, 1]]))).toBe(1)
    expect(sizeOf({ a: 1 })).toBe(1)
    expect(sizeOf(5)).toBeNaN()
    expect(sizeOf(null)).toBeNaN()
  })

  it('toValue', () => {
    expect(toValue(1)).toBe(1)
    expect(toValue(ref(2))).toBe(2)
    expect(toValue(() => 3)).toBe(3)
  })
})

describe('[utils] paths', () => {
  it('setIn and getIn', () => {
    const base: Record<string, any> = {}
    setIn(base, ['one', 'two', 'three'], 'test')
    setIn(base, ['two'], 'test2')
    setIn(base, ['one', 'two', 'four'], false)

    expect(base).toStrictEqual({ one: { two: { three: 'test', four: false } }, two: 'test2' })
    expect(getIn(base, ['one', 'two'])).toStrictEqual({ three: 'test', four: false })
    expect(getIn(base, ['one', 'two', 'three'])).toBe('test')
    expect(getIn(base, ['missing', 'deeper'])).toBeUndefined()
  })

  it('setIn replaces non-object intermediates', () => {
    const base: Record<string, any> = { a: 'string' }
    setIn(base, ['a', 'b'], 1)
    expect(base).toStrictEqual({ a: { b: 1 } })
  })

  it('isPathPrefix', () => {
    expect(isPathPrefix(['a'], ['a', 'b'])).toBe(true)
    expect(isPathPrefix(['a', 'b'], ['a', 'b'])).toBe(true)
    expect(isPathPrefix(['a', 'b'], ['a'])).toBe(false)
    expect(isPathPrefix(['b'], ['a', 'b'])).toBe(false)
  })
})
