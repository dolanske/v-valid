import { expect, test } from 'vitest'
import { $and, $or, $test, maxLength, minLength, type } from '../src'

test('[Helpers] test', async () => {
  // Simple value validations
  expect($test(minLength(3), [0, 1, 2, 3])).toBeTruthy()
  expect($test(maxLength(3), 'wrong type')).toBeFalsy()

  // Combining with helpers
  expect(
    await $test($and(minLength(1), maxLength(3), type.map), [1, 2, 3]),
  ).toBeFalsy()
  expect(
    await $test($or(minLength(1), maxLength(3), type.map), [1, 2, 3]),
  ).toBeTruthy()
})
