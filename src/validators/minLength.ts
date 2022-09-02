import { isMap, isNil, isObject, isSet } from "lodash"
import type { ValidationRule } from "../types"

/**
 * @Rule Input must be equal or greater than the provided amount
 *
 * @param min Minimum allowed length the input must satisfy
 */
export const minLength = (min: number): ValidationRule => {
  return {
    _validate(value: string | Set<any> | Map<any, any> | any[] | object) {
      if (isNil(value)) return false
      if (isSet(value) || isMap(value)) return value.size >= min
      if (isObject(value)) {
        return Object.keys(value).length >= min
      }

      return value?.length ? value.length >= min : false
    },
    /* c8 ignore next 3 */
    _message() {
      return `Value must be at least ${min} characters long`
    }
  }
}
