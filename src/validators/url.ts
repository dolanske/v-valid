import { isNil } from "lodash"
import { ValidationRule } from "../types"

export const url: ValidationRule = {
  _validate(value: any) {
    if (isNil(value)) return false

    try {
      new URL(value)
      return true
    } catch (e) {
      return false
    }
  },
  _message() {
    return "Value must be a valid URL"
  }
}
