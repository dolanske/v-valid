import { isDate, isNil, isNumber } from 'lodash'
import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'

/**
 * @Rule Input must be a number or a date which satisfies the maximum provided value.
 * @param max maximum allowed value
 */

const maxValue = (max: number | Date | Ref<number | Date>) => {
  return {
    _skip: false,
    validate(value: number | Date) {
      if (isNil(value))
        return false

      max = unref(max)

      if (isNumber(value))
        return value <= max
      if (isDate(value))
        return new Date(value) <= new Date(max)

      return false
    },
    /* c8 ignore next 3 */
    label() {
      return `Maximum allowed value is ${unref(max)}`
    },
  } as ValidationRule
}

maxValue.skip = SKIP_PROTO

export {
  maxValue,
}
