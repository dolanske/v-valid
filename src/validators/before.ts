import type { MaybeRef } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'
import { isDate, isNil } from '../utils'

/**
 * @Rule Input must be a date before or at the provided rule
 * @param max maximum allowed value
 */

function before(max: MaybeRef<Date>) {
  return {
    name: 'before',
    __skip: false,
    validate: (value: Date) => {
      if (isNil(value) || !isDate(value))
        return false

      return new Date(value) <= new Date(max = unref(max))
    },
    /* c8 ignore next 3 */
    label: () => {
      return `Date must be before or at ${unref(max)}`
    },
  } as ValidationRule
}

before.skip = SKIP_PROTO

export {
  before,
}
