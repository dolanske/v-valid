import type { MaybeRef } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'
import { isDate, isNil } from '../utils'

/**
 * @Rule Input must be a date after or at the provided rule
 * @param min Minimum allowed value
 */

function after(min: MaybeRef<Date>): ValidationRule {
  return {
    name: 'after',
    __skip: false,
    validate: (value: Date) => {
      if (isNil(value) || !isDate(value))
        return false

      return new Date(value) >= new Date(unref(min))
    },
    /* c8 ignore next 3 */
    label: () => {
      return `Date must be after or at ${unref(min)}`
    },
  }
}

after.skip = SKIP_PROTO

export {
  after,
}
