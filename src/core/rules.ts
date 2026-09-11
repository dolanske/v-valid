import type { RulesFor } from '../types'

/**
 * Type helper for writing rules against a form type. Returns the rules as-is.
 *
 * ```ts
 * const rules = defineRules<typeof form>({
 *   name: [required, maxLength(64)],
 *   info: { contact: { required, email } },
 * })
 * ```
 */
export function defineRules<F extends object>(rules: RulesFor<F>): RulesFor<F> {
  return rules
}
