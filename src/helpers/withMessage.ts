import type { ValidationRule } from "../types"

export const withMessage = (
  message: string,
  validator: ValidationRule
): ValidationRule => {
  const { _validate } = validator

  return {
    _validate,
    _message: () => message
  }
}
