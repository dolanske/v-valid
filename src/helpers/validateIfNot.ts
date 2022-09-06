import { isBoolean, isFunction } from "lodash"
import { ValidationRule } from "../types"
import { isRef, Ref } from "vue-demi"
import { SKIP_PROTO } from "../shared"

/**
 * @Rule Perform validation if provided condition is not met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */

export const validateIfNot = (
  condition: boolean | (() => boolean) | Ref<boolean> | Promise<boolean>,
  rule: ValidationRule
): ValidationRule | Promise<ValidationRule> => {
  // Boolean
  if (isBoolean(condition)) {
    return condition ? SKIP_PROTO() : rule
  }

  // ref
  if (isRef(condition)) {
    return condition.value ? SKIP_PROTO() : rule
  }

  // Function returning boolean
  if (isFunction(condition)) {
    return condition() ? SKIP_PROTO() : rule
  }

  return condition.then((result) => {
    return result ? SKIP_PROTO() : rule
  })
}
