import { describe, expect, test } from 'vitest'
import { type } from '../src/index'

describe('[Validators] Type', () => {
  test('ARRAY type', () => {
    expect(type.str.validate('Hello')).toBeTruthy()
    expect(type.str.validate(String('Hello world'))).toBeTruthy()

    expect(type.str.validate(10)).toBeFalsy()
    expect(type.str.validate(1 + 2)).toBeFalsy()
  })

  test('NUMBER type', () => {
    expect(type.num.validate(10)).toBeTruthy()
    expect(type.num.validate(Number(10))).toBeTruthy()

    expect(type.num.validate('10')).toBeFalsy()
    expect(type.num.validate(`${1}10`)).toBeFalsy()
  })

  test('ARRAY type', () => {
    expect(type.arr.validate([])).toBeTruthy()
    expect(type.arr.validate([])).toBeTruthy()

    expect(type.arr.validate({})).toBeFalsy()
    expect(type.arr.validate(new Set())).toBeFalsy()
    expect(type.arr.validate(new Map())).toBeFalsy()
  })

  test('OBJECT type', () => {
    expect(type.obj.validate({})).toBeTruthy()
    expect(type.obj.validate({ test: true })).toBeTruthy()
    expect(type.obj.validate({ test: 'true' })).toBeTruthy()

    expect(type.obj.validate([])).toBeFalsy()
    expect(type.obj.validate(new Set())).toBeFalsy()
    expect(type.obj.validate(new Map())).toBeFalsy()
  })

  test('SET type', () => {
    expect(type.set.validate(new Set(['one']))).toBeTruthy()
    expect(type.set.validate(new Set([() => {}]))).toBeTruthy()

    expect(type.set.validate([])).toBeFalsy()
    expect(type.set.validate({})).toBeFalsy()
    expect(type.set.validate(new Map())).toBeFalsy()
  })

  test('MAP type', () => {
    expect(type.map.validate(new Map([['one', 1], ['two', 2]]))).toBeTruthy()
    expect(type.map.validate(new Map())).toBeTruthy()

    expect(type.map.validate([])).toBeFalsy()
    expect(type.map.validate({})).toBeFalsy()
    expect(type.map.validate(new Set())).toBeFalsy()
  })

  test('DATE type', () => {
    expect(type.date.validate(new Date())).toBeTruthy()
    expect(type.date.validate(new Date().toString())).toBeTruthy()
    expect(type.date.validate(Date.now())).toBeTruthy()

    expect(type.date.validate(new Date('helloworld'))).toBeFalsy()
    expect(type.date.validate(new Date('41276437891263'))).toBeFalsy()
  })
})
