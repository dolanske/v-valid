import type { ValidationRule } from '../types'
import { isEmpty } from '../utils'
import { and } from './and'

/**
 * @rule Passes when the value is empty (`null`, `undefined`, `''`, `[]`...),
 * otherwise the value must pass all provided rules. Use it for fields which are
 * not required but must be well formed when filled in.
 * @param rules Validation rules
 *
 * ```ts
 * const rules = {
 *   website: { url: optional(url) },
 * }
 * ```
 */
export function optional(...rules: ValidationRule[]): ValidationRule {
  const inner = rules.length === 1 ? rules[0] : and(...rules)

  return {
    name: inner.name,
    params: inner.params,
    label: inner.label,
    validate: value => isEmpty(value) ? true : inner.validate(value),
  }
}
