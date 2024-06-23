import { isDate, isNil, isNumber } from 'lodash-es'
import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'

/**
 * @Rule Input must be a number or a date which satisfies the maximum provided value.
 * @param max maximum allowed value
 */

function maxValue(max: number | Date | Ref<number | Date>) {
  return {
    name: 'maxValue',

    __skip: false,
    validate: (value: number | Date) => {
      if (isNil(value))
        return false

      max = unref(max)

      if (isNumber(value) && isNumber(max))
        return value <= max
      if (isDate(value))
        return new Date(value) <= new Date(max)

      return false
    },
    /* c8 ignore next 3 */
    label: () => {
      return `Value must be shorter or equal to ${unref(max)}`
    },
  } as ValidationRule
}

maxValue.skip = SKIP_PROTO

export {
  maxValue,
}
