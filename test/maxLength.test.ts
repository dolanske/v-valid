import { expect, test } from 'vitest'
import { maxLength } from '../src/index'

test('[validators] maxLength', () => {
  expect(maxLength(1).validate([])).toBeTruthy()
  expect(maxLength(1).validate(new Set())).toBeTruthy()
  expect(maxLength(1).validate(new Map([]))).toBeTruthy()
  expect(maxLength(1).validate({})).toBeTruthy()
  expect(maxLength(1).validate('a')).toBeTruthy()

  expect(maxLength(1).validate(['one', 'two'])).toBeFalsy()
  expect(maxLength(1).validate(new Set(['one', 'two']))).toBeFalsy()
  expect(maxLength(1).validate(new Map([[1, 'one'], [2, 'two']]))).toBeFalsy()
  expect(maxLength(1).validate({ one: 1, two: 2 })).toBeFalsy()
  expect(maxLength(1).validate('one')).toBeFalsy()
})
