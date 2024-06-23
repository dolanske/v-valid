import { isNil } from 'lodash-es'
import { SKIP_PROTO } from '../shared'
import { emailRegex } from '../regex'
import type { ValidationRuleObject } from '../types'

/**
 * @Rule Input must be a valid email address
 */

export const email: ValidationRuleObject = {
  __skip: false,
  name: 'email',
  skip: SKIP_PROTO,
  validate: (value: string) => {
    if (isNil(value))
      return false

    return emailRegex.test(value)
  },
  /* c8 ignore next 3 */
  label: () => {
    return 'Value must be in a valid email format'
  },
}
