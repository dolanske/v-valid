import { isMap, isNil, isObject, isSet } from 'lodash-es'
import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'

/**
 * @Rule Input must be equal or greater than the provided amount
 * @param min Minimum allowed length the input must satisfy
 */
const minLength = (min: number | Ref<number>) => {
  return {
    _skip: false,
    validate: (value: string | Set<any> | Map<any, any> | any[] | object) => {
      if (isNil(value))
        return false

      min = unref(min)

      if (isSet(value) || isMap(value))
        return value.size >= min
      if (isObject(value))
        return Object.keys(value).length >= min

      return value?.length ? value.length >= min : false
    },
    /* c8 ignore next 3 */
    label: () => {
      return `Value must be greater or equal to ${unref(min)}`
    },
  } as ValidationRule
}

minLength.skip = SKIP_PROTO

export { minLength }
