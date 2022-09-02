import { isNumber } from "lodash"
import { ValidationRule } from "../types"

export const isNum: ValidationRule = {
  _validate(value: any) {
    return isNumber(value)
  },
  _message() {
    return "Value must be a number"
  }
}
