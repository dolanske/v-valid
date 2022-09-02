import { isNil } from "lodash"
import type { ValidationRule, Message } from "../types"

/**
 *
 * Helper method which adds custom message to any validation.
 *
 * ```ts
 * minLength: withMessage("Too short!", minLength(10))
 * ```
 *
 * @param message Custom message to display in the returned error
 * @param validator Validation rule
 */

export const withMessage = (
  message: string | Message,
  validator: ValidationRule
): ValidationRule => {
  const { _validate } = validator

  if (isNil(_validate)) {
    throw new Error("[withMessage] Missing validator function")
  }

  return {
    _validate,
    _message: (args) => {
      if (typeof message === "string") return message
      return message(args)
    }
  }
}
