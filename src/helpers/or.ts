import type { ValidationRule } from '../types'
import { SKIP_PROTO, validateEntries } from '../shared'

/**
 * @rule Value must pass at least one of the provided checks
 * @param rules Single or multiple validation rules
 */
function $or(...rules: ValidationRule[]): ValidationRule {
  return {
    _skip: false,
    validate: (value: any) => validateEntries(value, rules, 'some'),
    label() {
      return 'Value must pass some of the checks'
    },
  }
}

$or.skip = SKIP_PROTO

export { $or }
