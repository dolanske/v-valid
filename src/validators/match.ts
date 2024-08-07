import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'
import { isNil } from '../utils'

/**
 * @Rule Input must pass the provided regex test
 * @param regex Regex validation rule
 */

function match(regex: RegExp | string): ValidationRule {
  const r = typeof regex === 'string' ? new RegExp(regex) : regex

  return {
    name: 'match',

    __skip: false,
    validate: (value: string) => {
      if (isNil(value))
        return false

      return r.test(value)
    },
    /* c8 ignore next 3 */
    label: () => {
      return 'Value must match the provided rule.'
    },
  }
}

match.skip = SKIP_PROTO

export { match }
