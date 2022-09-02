import { emailRegex } from "../regex"

/**
 * @Rule Input must be a valid email address
 */

export const email = {
  _validate(value: string) {
    return emailRegex.test(value)
  },
  /* c8 ignore next 3 */
  _message() {
    return "Value must be in a valid email format"
  }
}
