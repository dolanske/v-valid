import { hasLowercase, hasNumber, hasUppercase, noSpecialCharsRegex } from '../../regex'
import { SKIP_PROTO } from '../../shared'
import type { ValidationRule } from '../../types'

// enum Len {
//   "Very Weak",
//   "Weak",
//   "Ok",
//   "Strong",
//   "Very Strong"
// }

function checkPassword(value: string | number) {
  value = String(value)
  let variations = 0

  // Same case letters (26)
  // 26^n
  if (hasLowercase.test(value))
    variations += 26

  // Lowercase/uppercase (26)
  // 52^n
  if (hasUppercase.test(value))
    variations += 26

  // Number (10)
  // 62^n
  if (hasNumber.test(value))
    variations += 10

  // Symbols (33)
  // 95^n
  if (noSpecialCharsRegex.test(value))
    variations += 33

  const size = variations ** value.length
  return size
}

function password(): ValidationRule {
  return {
    name: 'password',
    _skip: false,
    validate: (value: any) => {
      return !value
    },
    label: () => {
      return ''
    },
  }
}

password.skip = SKIP_PROTO

export {
  password,
  checkPassword,
}
