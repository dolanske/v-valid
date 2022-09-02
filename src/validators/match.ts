import type { ValidationRule } from "../types"

/**
 * @Rule Input must pass the provided regex test
 *
 * @param regex Regex validation rule
 */

export const match = (regex: RegExp): ValidationRule => {
  const r = new RegExp(regex)

  return {
    _validate(value: string): boolean {
      return r.test(value)
    },
    /* c8 ignore next 3 */
    _message(): string {
      return "Value does not match the provided rule."
    }
  }
}
