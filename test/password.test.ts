import { expect, test } from 'vitest'
import { checkPassword } from '../src/validators/string/password'

test('[Validations] Password validation', () => {
  expect(checkPassword(1)).toBe(10)
  expect(checkPassword(10)).toBe(100)
})
