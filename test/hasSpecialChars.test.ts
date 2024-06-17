import { expect, it } from 'vitest'
import { hasSpecialChars } from '../src/validators/string/hasSpecialChars'

it('[Validator] HasSpecialChars', () => {
  expect(hasSpecialChars.validate('Hello')).toBeTruthy()
  expect(hasSpecialChars.validate('H$**@')).toBeFalsy()

  expect(hasSpecialChars.label([])).toBe('Value must be a string and contain no special characters')
  expect(hasSpecialChars.label('@')).toBe('Value must not contain any special characters')
})
