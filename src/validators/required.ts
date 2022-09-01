import { isEmpty, isNil } from "lodash"

import type { ValidationRule } from "../types"

/**
 * @Rule Input must not be empty, null or undefined
 */
export const required: ValidationRule = {
  _validate(value: any) {
    // If value is missing in general
    if (isNil(value) || value === "null" || value === "undefined") return false

    // If value is string, check if length is > 0
    if (typeof value === "string") {
      return value.length > 0
    }

    // If number has passed the nil check and it is a number
    // we can assume it is truthy, as idk how it would not be?
    if (typeof value === "number") return true

    // For the last check, we look into Arrays, Objects, Maps and Sets
    return !isEmpty(value)
  },
  _message() {
    return "Value is required"
  }
}
