import { isNil } from "lodash"
import { SKIP_PROTO } from "../shared"
import { ValidationRule, ValidationRuleObject } from "../types"

export const url: ValidationRuleObject = {
  _skip: false,
  skip: SKIP_PROTO,
  validate(value: any) {
    if (isNil(value)) return false

    try {
      new URL(value)
      return true
    } catch (e) {
      return false
    }
  },
  label() {
    return "Value must be a valid URL"
  }
}
