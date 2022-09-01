import { isNil } from "lodash"

/**
 * @Rule Input must be equal or lesser than the provided amount
 */

export const maxLength = (len: number) => {
  return {
    _validate(value: any) {
      if (isNil(value) || value.length === 0) return true

      return value?.length ? value.length <= len : false
    },
    _message() {
      return `Value must be equal or smaller than ${len} characters`
    }
  }
}
