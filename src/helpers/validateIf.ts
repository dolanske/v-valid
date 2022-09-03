import { isBoolean } from "lodash"
import { ValidationRule } from "../types"

/**
 * @Rule Perform validation if provided condition is met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */

export const validateIf = (
  condition: boolean | (() => boolean),
  rule: ValidationRule
): ValidationRule => {
  const shouldValidate = isBoolean(condition) ? condition : condition()

  if (shouldValidate) return rule

  return {
    _validate: () => true,
    _message: () => ""
  }
}
