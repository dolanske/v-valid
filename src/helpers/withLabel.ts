import type { Label, ValidationRule } from '../types'
import { chain, isString } from '../utils'

/**
 * Replaces the error message of a rule.
 *
 * ```ts
 * minLength: withLabel('Too short!', minLength(10))
 * between: withLabel((value, { min, max }) => `${value} is not between ${min} and ${max}`, between(5, 10))
 * ```
 *
 * @param message Message, or a callback receiving the value and the rule's parameters
 * @param rule Validation rule
 */
export function withLabel<P>(message: Label<P>, rule: ValidationRule<P>): ValidationRule<P> {
  return {
    name: rule.name,
    params: rule.params,
    skipped: rule.skipped,
    // Messages returned by the wrapped rule are discarded in favour of ours
    validate: value => chain(rule.validate(value), result => result === true),
    label: (value, params) => isString(message) ? message : message(value, params),
  }
}
