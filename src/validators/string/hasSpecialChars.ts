import { noSpecialCharsRegex } from '../../regex'
import { SKIP_PROTO } from '../../shared'
import type { ValidationRuleObject } from '../../types'
import { isNil } from '../../utils'

/**
 * @Rule Checks wether an input contains any special characters
 */

export const hasSpecialChars: ValidationRuleObject = {
  __skip: false,
  name: 'hasSpecialChars',

  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false
    return !noSpecialCharsRegex.test(value)
  },
  label: (value) => {
    if (typeof value !== 'string')
      return 'Value must be a string and contain no special characters'

    return 'Value must not contain any special characters'
  },
}
