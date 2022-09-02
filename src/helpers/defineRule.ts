import { isNumber } from "lodash"
import { Message, ValidationRule } from "../types"

/**
 * Helper used to create custom validation rules
 *
 * @param message Custom message to display in the returned error
 * @param rule Custom rule method which must return a boolean
 *
 *
 * Example
 * ```ts
 * const rule = defineRule("Number larger than 10", (value) => {
 * return isNumber(value) && value > 10
 * })
 * ```
 */

// TODO: if we do not specify any parameters, should it return a function or an
// object? aka instead of return (): ValidationRule we could do return {}: ValidationRule aleady

// TODO: Properly document all possible examples
export const defineRule = (
  // Message is either a string or a function with injected
  message: string | ((...args: any[]) => string),
  rule: (value: any, ...args: any[]) => boolean
) => {
  // args are the optional values you can input when creating a rule
  return (...args: any[]): ValidationRule => ({
    // the value from _validate is the actual value we are testing against
    // injected during validation

    _validate: (value) => rule(value, args),
    _message: (ctx) => {
      if (typeof message === "string") return message

      // ctx is injected during validation

      // ...args are the parameters user inputs when creating the rule
      return message(ctx, ...args)
    }
  })
}
