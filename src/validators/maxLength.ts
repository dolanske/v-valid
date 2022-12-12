import { isMap, isNil, isObject, isSet } from 'lodash'
import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'

/**
 * @Rule Input must be equal or lesser than the provided amount
 * @param max Maximum allowed length the input must satisfy
 */

const maxLength = (max: number | Ref<number>): ValidationRule => {
  return {
    _skip: false,
    validate: (value: string | Set<any> | Map<any, any> | any[] | object) => {
      if (isNil(value))
        return false
      max = unref(max)
      if (isSet(value) || isMap(value))
        return value.size <= max
      if (isObject(value))
        return Object.keys(value).length <= max

      return value?.length ? value.length <= max : false
    },
    /* c8 ignore next 3 */
    label: () => {
      return `Value must have a maximum length of ${unref(max)}`
    },
  }
}

maxLength.skip = SKIP_PROTO

export { maxLength }
