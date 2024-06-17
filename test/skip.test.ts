import { expect, it } from 'vitest'
import { minLength } from '../src'

it('[Helpers] skip prototype', () => {
  expect(minLength(1)._skip).toBeFalsy()
  expect(minLength.skip(1)._skip).toBeTruthy()
})
