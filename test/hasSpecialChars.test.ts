import { expect, test } from 'vitest'
import { hasSpecialChars } from '../src/validators/string/hasSpecialChars'

test('[Validator] HasSpecialChars', () => {
  expect(hasSpecialChars.validate('Hello')).toBeTruthy()
  expect(hasSpecialChars.validate('H$**@')).toBeFalsy()
})
