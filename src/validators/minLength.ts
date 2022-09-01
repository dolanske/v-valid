import { isNil } from "lodash"

/**
 * @Rule Input must be equal or greater than the provided amount
 */
export const minLength = (len: number) => {
  return {
    _validate(value: any) {
      if (isNil(value)) return false

      return value?.length ? value.length >= len : false
    },
    _message() {
      return `Value must be at least ${len} characters long`
    }
  }
}
