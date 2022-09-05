import { ValidationRule } from "./types"

export const SKIP_PROTO = function (...args: any[]): ValidationRule {
  return {
    _skip: true,
    validate: () => true,
    label: () => "test"
  }
}
