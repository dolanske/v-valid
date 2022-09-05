import { ValidationRule } from "../types"
import { validateEntries } from "../shared"

/**
 * @rule Value must fail the check or list of all provided checks
 * @param rules Single or multiple validation rules
 */
export const not = (...rules: ValidationRule[]): ValidationRule => {
  return {
    // Figure out how to add these
    _skip: false,
    validate: (value: any) => validateEntries(value, rules, "none"),
    label() {
      return "Value must not pass any of the checks"
    }
  }
}
