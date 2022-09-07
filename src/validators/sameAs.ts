import { isRef } from "vue-demi"
import { SKIP_PROTO } from "../shared"
import type { ValidationRule } from "../types"

/**
 * @Rule Input must match the provided `compared` value, either by value or by type & value
 *
 * @param compared The value we compare to the input
 * @param lenient Wether to compare values as == or === (default ===)
 */

const sameAs = (compared: any, lenient: boolean = false): ValidationRule => {
  return {
    _skip: false,
    validate(value: any) {
      if (isRef(value)) value = value.value
      if (isRef(compared)) compared = compared.value

      return lenient ? value == compared : value === compared
    },
    /* c8 ignore next 3 */
    label() {
      return "Values do not match"
    }
  }
}

sameAs.skip = SKIP_PROTO

export { sameAs }
