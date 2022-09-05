import { ValidationRule } from "../types"
import { validateEntries } from "../shared"

/**
 * @rule Value must pass every provided check
 * @param rules Single or multiple validation rules
 */
export const and = (...rules: ValidationRule[]): ValidationRule => {
  return {
    // Figure out how to add these
    _skip: false,
    validate: (value: any) => validateEntries(value, rules, "every"),
    label() {
      return "Value did not pass all the required checks"
    }
  }
}
