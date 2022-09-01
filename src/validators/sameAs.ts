/**
 * @Rule Input must match the provided `compared` value, either by value or by type & value
 *
 */

export const sameAs = (compared: any, leanient: boolean = false) => {
  return {
    _validate(value: any) {
      return leanient ? value == compared : value === compared
    },
    _message() {
      return "Values do not match"
    }
  }
}
