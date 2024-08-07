import { SKIP_PROTO } from '../shared'
import type { ValidationRuleObject } from '../types'
import { isNil } from '../utils'

/**
 * @Rule Input must be a valid URL
 */

export const url: ValidationRuleObject = {
  __skip: false,
  name: 'url',
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false

    try {
      return new URL(value) instanceof URL
    }
    catch (e) {
      return false
    }
  },
  label: () => {
    return 'Value must be a valid URL'
  },
}
