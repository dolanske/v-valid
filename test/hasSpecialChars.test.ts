import { expect, test } from 'vitest'
import { hasSpecialChars } from '../src/validators/string/hasSpecialChars'

test('[Validator] HasSpecialChars', () => {
  expect(hasSpecialChars.validate('Hello')).toBeTruthy()
  expect(hasSpecialChars.validate('H$**@')).toBeFalsy()

  expect(hasSpecialChars.label([])).toBe('Input value must be a string and contain no special characters')
  expect(hasSpecialChars.label('@')).toBe('Value must not contain any special characters')
})
