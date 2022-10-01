import { isNil } from 'lodash'
import { SKIP_PROTO } from '../shared'
import type { ValidationRuleObject } from '../types'

/**
 * @Rule Input must be a valid URL
 */

export const url: ValidationRuleObject = {
  _skip: false,
  skip: SKIP_PROTO,
  validate(value: any) {
    if (isNil(value))
      return false

    try {
      return new URL(value) instanceof URL
    }
    catch (e) {
      return false
    }
  },
  label() {
    return 'Value must be a valid URL'
  },
}
