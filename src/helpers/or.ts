import { ValidationRule } from "../types"
import { validateEntries } from "../shared"

/**
 * @rule Value must pass at least one of the provided checks
 * @param rules Single or multiple validation rules
 */
export const or = (...rules: ValidationRule[]): ValidationRule => {
  return {
    // Figure out how to add these
    _skip: false,
    validate: (value: any) => validateEntries(value, rules, "some"),
    label() {
      return "Value did not pass any of the required checks"
    }
  }
}
