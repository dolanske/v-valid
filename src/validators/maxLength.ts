import { isMap, isNil, isObject, isSet } from "lodash"
import { SKIP_PROTO } from "../defaults"
import type { ValidationRule } from "../types"

/**
 * @Rule Input must be equal or lesser than the provided amount
 *
 * @param max Maximunm allowed length the input must satisfy
 */

const maxLength = (max: number): ValidationRule => {
  return {
    _skip: false,
    validate(value: any) {
      if (isNil(value)) return false
      if (isSet(value) || isMap(value)) return value.size <= max
      if (isObject(value)) {
        return Object.keys(value).length <= max
      }

      return value?.length ? value.length <= max : false
    },
    /* c8 ignore next 3 */
    label() {
      return `Value must be equal or smaller than ${max} characters`
    }
  }
}

maxLength.skip = SKIP_PROTO

export { maxLength }
