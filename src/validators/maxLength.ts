import { isMap, isNil, isObject, isSet } from "lodash"
import type { ValidationRule } from "../types"

/**
 * @Rule Input must be equal or lesser than the provided amount
 *
 * @param max Maximunm allowed length the input must satisfy
 */

export const maxLength = (max: number): ValidationRule => {
  return {
    _validate(value: any) {
      if (isNil(value)) return false
      if (isSet(value) || isMap(value)) return value.size <= max
      if (isObject(value)) {
        return Object.keys(value).length <= max
      }

      return value?.length ? value.length <= max : false
    },
    /* c8 ignore next 3 */
    _message() {
      return `Value must be equal or smaller than ${max} characters`
    }
  }
}
