import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'
import { isDate, isNil, isNumber } from '../utils'

/**
 * @Rule Input must be a number or a date which satisfies the minimum provided value.
 * @param min Minimum allowed value
 */

function minValue(min: number | Date | Ref<number | Date>): ValidationRule {
  return {
    name: 'minValue',
    __skip: false,
    validate: (value: number | Date) => {
      if (isNil(value))
        return false

      min = unref(min)

      if (isNumber(value) && isNumber(min))
        return value >= min
      if (isDate(value))
        return new Date(value) >= new Date(min)

      return false
    },
    /* c8 ignore next 3 */
    label: () => {
      return `Minimum allowed value is ${unref(min)}`
    },
  }
}

minValue.skip = SKIP_PROTO

export {
  minValue,
}
