import type { ValidationRuleObject } from '../types'
import { SKIP_PROTO } from '../shared'

/**
 * @Rule Checks wether a provide value is a decimal or not
 */

export const decimal: ValidationRuleObject = {
  _skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (Number.isNaN(value))
      return false

    // Only numbers pass now
    return Number.isInteger(value)
  },
  label: () => 'Value must be an integer',
}
