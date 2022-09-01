/**
 * @Rule Input must be a valid email address
 */

export const email = {
  _validate(value: any) {
    return /^\S+@\S+\.\S+$/.test(value)
  },
  _message() {
    return "Value must be in a valid email format"
  }
}
