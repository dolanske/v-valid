import { isBoolean, isFunction } from "lodash"
import { ValidationRule } from "../types"
import { isRef, Ref } from "vue-demi"
import { SKIP_PROTO } from "../shared"

/**
 * @Rule Perform validation if provided condition is met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */

export const validateIf = (
  condition: boolean | (() => boolean) | Ref<boolean> | Promise<boolean>,
  rule: ValidationRule
): ValidationRule | Promise<ValidationRule> => {
  // Boolean
  if (isBoolean(condition)) {
    return condition ? rule : SKIP_PROTO()
  }

  // ref
  if (isRef(condition)) {
    return condition.value ? rule : SKIP_PROTO()
  }

  // Function returning boolean
  if (isFunction(condition)) {
    return condition() ? rule : SKIP_PROTO()
  }

  return condition.then((result) => {
    return result ? rule : SKIP_PROTO()
  })
}
