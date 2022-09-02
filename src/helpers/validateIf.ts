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
  // REVIEW: Consider adding option to allow passing a validator as condition

  // This will only validate if condition is met
  // let shouldValidate: boolean = false

  // if (isFunction(condition)) {
  //   const fnResult = condition()
  //   if (isBoolean(fnResult)) shouldValidate = fnResult
  // shouldValidate = fnResult.validate()
  // if (fnResult._validate())
  // }

  // If its an object that has _validate()

  const shouldValidate = isBoolean(condition) ? condition : condition()

  if (shouldValidate) return rule

  return {
    // REVIEW: Should ValidationRule contain private methods like 'skip' so
    // instead of this hacky thing, we'd just return _skip = true and
    // automatically ignore this during validation
    _validate: () => true,
    _message: () => ""
  }
}
