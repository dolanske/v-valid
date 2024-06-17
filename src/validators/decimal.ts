import type { ValidationRuleObject } from '../types'
import { SKIP_PROTO } from '../shared'

/**
 * @Rule Checks wether a provide value is a decimal or not
 */

export const decimal: ValidationRuleObject = {
  _skip: false,
  name: 'decimal',

  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNaN(value))
      return false

    // Only numbers pass now
    return (value - Math.floor(value)) !== 0
  },
  label: () => 'Value must be an integer',
}
