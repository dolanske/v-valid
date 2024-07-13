import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'
import { isMap, isNil, isObject, isSet } from '../utils'

/**
 * @Rule Input must be equal or lesser than the provided amount
 * @param max Maximum allowed length the input must satisfy
 */

function maxLength(max: number | Ref<number>): ValidationRule {
  return {
    name: 'maxLength',
    __skip: false,
    validate: (value: string | Set<any> | Map<any, any> | any[] | object) => {
      if (isNil(value))
        return false
      max = unref(max)
      if (isSet(value) || isMap(value))
        return value.size <= max
      if (isObject(value))
        return Object.keys(value).length <= max

      return value.length <= max
    },
    /* c8 ignore next 3 */
    label: () => {
      return `Value must be lesser or equal to ${unref(max)}`
    },
  }
}

maxLength.skip = SKIP_PROTO

export { maxLength }
