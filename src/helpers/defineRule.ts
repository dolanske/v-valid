import { isFunction, isNil, isObject, isString } from "lodash"
import { Label, ValidationRule } from "../types"

// REVIEW: Is this the best way to define this API

/**
 * Helper used to create custom validation rules
 *
 * @param rule Custom rule method which must return a boolean
 * @param message Custom message or message callback to display in the returned
 * error. Label callback exposes the validated value and all rule parameters
 *
 * **Simple rule without any parameters**
 * ```ts
 * const rule = defineRule("overten","Number larger than 10", (value) => {
 * return isNumber(value) && value > 10
 * })
 * ```
 *
 * **Advanced rule, using multiple parameters**
 * ```ts
 * const arrLenInBetween = defineRule(
 * (value, min, max) => value.length >= min && value.length <= max
 * (value, min, max) => `Array [`${value.join(', ')}`] length must bet between ${min} and ${max}`,
 * )
 * ```
 */

const DEFAULTlabel = "Value did not pass the validation rule"

export const defineRule = (
  // Label is either a string or a function with injected
  rule: (value: any, ...args: any[]) => boolean | Promise<boolean>,
  message: string | Label
) => {
  // args are the optional values you can input when creating a rule
  return (...args: any[]): ValidationRule => ({
    // the value from validate is the actual value we are testing against
    // injected during validation
    _skip: false,
    validate: (value) => rule(value, ...args),
    label: (value) => {
      if (isNil(message)) return DEFAULTlabel

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
  rule,
  message
}: {
  rule: (value: any) => boolean | Promise<boolean>
  message?: string | Label
}): ValidationRule => {
  return {
    _skip: false,
    validate: (value) => rule(value),
    label: (value) => {
      if (isNil(message)) return DEFAULTlabel
      if (typeof message === "string") return message
      return message(value)
    }
  }
}
