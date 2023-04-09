import { SKIP_PROTO } from "../shared"
import { ValidationRule } from "../types"

const $each = (rules: any[]): ValidationRule => {
  return {
    _skip: false,
    validate: (value: any) => {
      return false
    },
    label() {
      return ''
    }
  }
}

$each.skip = SKIP_PROTO

export { $each }
