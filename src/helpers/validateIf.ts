import { isBoolean } from "lodash"
import { ValidationRule } from "../types"

/**
 * @Rule Perform validation if provided condition is met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */

/**
 * TODO This hsould work with
 * - [] A rule (also helpers like and, or and not)
 * - [] a ref<boolean>
 * - [] boolean
 * - [] Promise<boolean>
 * - [] () => boolean
 */

export const validateIf = (
  condition: boolean | (() => boolean),
  rule: ValidationRule
): ValidationRule => {
  const shouldValidate = isBoolean(condition) ? condition : condition()

  if (shouldValidate) return rule

  return {
    _skip: rule._skip,
    validate: () => true,
    label: () => ""
  }
}
