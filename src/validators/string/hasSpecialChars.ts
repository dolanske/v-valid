import { isNil } from 'lodash'
import { noSpecialCharsRegex } from '../../regex'
import { SKIP_PROTO } from '../../shared'
import type { ValidationRuleObject } from '../../types'

/**
 * @Rule Checks wether an input contains any special characters
 */

export const hasSpecialChars: ValidationRuleObject = {
  _skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false
    return !noSpecialCharsRegex.test(value)
  },
  label: (value) => {
    if (typeof value !== 'string')
      return 'Input value must be a string and contain no special characters'

    return 'Value must not contain any special characters'
  },
}
