import type { ValidationRuleObject } from '../types'
import { SKIP_PROTO } from '../shared'

/**
 * @Rule Input must be a decimal value. Either as a number or a string
 */

export const decimal: ValidationRuleObject = {
  __skip: false,
  name: 'decimal',

  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (typeof value !== 'number' && typeof value !== 'bigint') {
      return false
    }

    if (Number.isNaN(value))
      return false

    value = Number(value)

    // Only numbers pass now
    return (value - Math.floor(value)) !== 0
  },
  label: () => 'Value must be an integer',
}
