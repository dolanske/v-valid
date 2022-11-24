import type { ValidationRule } from '../types'
import { SKIP_PROTO, validateEntries } from '../shared'

/**
 * @rule Value must fail the check or list of all provided checks
 * @param rules Single or multiple validation rules
 */
const not = (...rules: ValidationRule[]): ValidationRule => {
  return {
    _skip: false,
    validate: (value: any) => validateEntries(value, rules, 'none'),
    label() {
      return 'Value must not pass any of the checks'
    },
  }
}

not.skip = SKIP_PROTO()

export { not }
