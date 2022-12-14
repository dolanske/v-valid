import { expect, test } from 'vitest'
import { minLength } from '../src/index'

test('[Helpers] skip prototype', () => {
  expect(minLength(1)._skip).toBeFalsy()
  expect(minLength.skip(1)._skip).toBeTruthy()
})
