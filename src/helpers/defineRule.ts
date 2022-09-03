import { isFunction, isObject, isString } from "lodash"
import { Message, ValidationRule } from "../types"

/**
 * Helper used to create custom validation rules
 *
 * @param message Custom message or message callback to display in the returned
 * error. Message callback exposes the validated value and all rule parameters
 *
 * @param rule Custom rule method which must return a boolean
 *
 * **Simple rule without any parameters**
 * ```ts
 * const rule = defineRule("Number larger than 10", (value) => {
 * return isNumber(value) && value > 10
 * })
 * ```
 *
 * **Advanced rule, using multiple parameters**
 * ```ts
 * const arrLenInBetween = defineRule(
 * (value, min, max) => `Array [`${value.join(', ')}`] length must bet between ${min} and ${max}`,
 * (value, min, max) => value.length >= min && value.length <= max
 * )
 * ```
 */

export const defineRule = (
  // Message is either a string or a function with injected
  message: string | Message,
  rule: (value: any, ...args: any[]) => boolean | Promise<boolean>
) => {
  // args are the optional values you can input when creating a rule
  return (...args: any[]): ValidationRule => ({
    // the value from _validate is the actual value we are testing against
    // injected during validation

    _validate: (value) => rule(value, ...args),
    _message: (value) => {
      if (typeof message === "string") return message
      // ...args are the parameters user inputs when creating the rule
      return message(value, ...args)
    }
  })
}

/**
 * **Experimental**
 *
 * Works exactly the same as defineRule but it is used as an object. When
 * declared in the ruleset, it does not accept any parameters
 */

export const defineRuleObj = ({
  message,
  rule
}: {
  message: string | Message
  rule: (value: any) => boolean | Promise<boolean>
}): ValidationRule => {
  return {
    _validate: (value) => rule(value),
    _message: (value) => {
      if (typeof message === "string") return message
      return message(value)
    }
  }
}
