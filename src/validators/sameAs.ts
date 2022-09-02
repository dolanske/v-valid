import type { ValidationRule } from "../types"

/**
 * @Rule Input must match the provided `compared` value, either by value or by type & value
 *
 * @param compared The value we compare to the input
 * @param leanient Wether to compare values as == or === (default ===)
 */

export const sameAs = (
  compared: any,
  leanient: boolean = false
): ValidationRule => {
  return {
    _validate(value: any) {
      return leanient ? value == compared : value === compared
    },
    /* c8 ignore next 3 */
    _message() {
      return "Values do not match"
    }
  }
}