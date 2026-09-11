import type { ValidationRule } from '../types'
import type { Condition } from './validateIf'
import { conditional } from './validateIf'

/**
 * @rule Runs the rule only if the condition is not met
 * @param condition Boolean, ref, getter or promise resolving to a boolean
 * @param rule Validation rule
 *
 * ```ts
 * const rules = {
 *   phone: { required: validateIfNot(() => form.email, required) },
 * }
 * ```
 */
export function validateIfNot(condition: Condition, rule: ValidationRule): ValidationRule {
  return conditional(condition, rule, false)
}
