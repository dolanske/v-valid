import { ValidationRule } from "../types"

export const url: ValidationRule = {
  _validate(value: any) {
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
