import type { ValidationRule } from '../types'
import { SKIP_PROTO, validateEntries } from '../shared'

/**
 * @rule Value must fail the check or list of all provided checks
 * @param rules Single or multiple validation rules
 */
function $not(...rules: ValidationRule[]): ValidationRule {
  return {
    name: 'not-validator',
    __skip: false,
    validate: (value: any) => validateEntries(value, rules, 'none'),
    label() {
      return 'Value must pass none of the checks'
    },
  }
}

$not.skip = SKIP_PROTO()

export { $not }
