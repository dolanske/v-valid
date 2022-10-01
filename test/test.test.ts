import { expect, test } from 'vitest'
import { test as _test, and, maxLength, minLength, or, type } from '../index'

test('[Helpers] test', async () => {
  // Simple value validations
  expect(_test(minLength(3), [0, 1, 2, 3])).toBeTruthy()
  expect(_test(maxLength(3), 'wrong type')).toBeFalsy()

  // Combining with helpers
  expect(
    await _test(and(minLength(1), maxLength(3), type.map), [1, 2, 3]),
  ).toBeFalsy()
  expect(
    await _test(or(minLength(1), maxLength(3), type.map), [1, 2, 3]),
  ).toBeTruthy()
})
