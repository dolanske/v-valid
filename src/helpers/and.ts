import type { ValidationRule } from '../types'
import { SKIP_PROTO, validateEntries } from '../shared'

/**
 * @rule Value must pass every provided check
 * @param rules Single or multiple validation rules
 */
function $and(...rules: ValidationRule[]): ValidationRule {
  return {
    name: 'and-validator',
    __skip: false,
    validate: (value: any) => validateEntries(value, rules, 'every'),
    label() {
      return 'Value must pass all the required checks'
    },
  }
}

$and.skip = SKIP_PROTO

export { $and }
