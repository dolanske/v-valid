import { expect, test } from 'vitest'
import { minLength } from '../src'

test('[validators] MinLength', () => {
  expect(minLength(1).validate([])).toBeFalsy()
  expect(minLength(1).validate(new Set())).toBeFalsy()
  expect(minLength(1).validate(new Map([]))).toBeFalsy()
  expect(minLength(1).validate({})).toBeFalsy()
  expect(minLength(1).validate('')).toBeFalsy()

  expect(minLength(1).validate(['one', 'two'])).toBeTruthy()
  expect(minLength(1).validate(new Set(['one', 'two']))).toBeTruthy()
  expect(minLength(1).validate(new Map([[1, 'one'], [2, 'two']]))).toBeTruthy()
  expect(minLength(1).validate({ one: 1, two: 2 })).toBeTruthy()
  expect(minLength(1).validate('one')).toBeTruthy()
})
