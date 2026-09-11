import type { MaybePromise, MaybeRefOrGetter, ValidationRule } from '../types'
import { chain, toValue } from '../utils'

export type Condition = MaybeRefOrGetter<MaybePromise<boolean>> | Promise<boolean>

/**
 * Wraps a rule so that it only runs while `condition` holds. The condition is
 * evaluated every time the field is validated, so a getter or ref reflects the
 * current form state without wrapping the rules in `computed`.
 */
export function conditional(condition: Condition, rule: ValidationRule, expected: boolean): ValidationRule {
  return {
    name: rule.name,
    // Reading the condition here makes it a dependency of the proactive watcher
    params: () => {
      toValue(condition)
      return rule.params?.()
    },
    label: rule.label,
    validate: value => chain(toValue(condition), met => Boolean(met) === expected ? rule.validate(value) : true),
  }
}

/**
 * @rule Runs the rule only if the condition is met
 * @param condition Boolean, ref, getter or promise resolving to a boolean
 * @param rule Validation rule
 *
 * ```ts
 * const rules = {
 *   company: { required: validateIf(() => form.isBusiness, required) },
 * }
 * ```
 */
export function validateIf(condition: Condition, rule: ValidationRule): ValidationRule {
  return conditional(condition, rule, true)
}
