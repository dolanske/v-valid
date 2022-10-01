import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule } from '../types'

/**
 * @Rule Input must match the provided `compared` value, either by value or by type & value
 * @param compared The value we compare to the input
 * @param lenient Wether to compare values as == or === (default ===)
 */

const sameAs = (
  compared: any | Ref<any>,
  lenient = false,
): ValidationRule => {
  return {
    _skip: false,
    validate(value: any) {
      compared = unref(compared)

      return lenient
        // eslint-disable-next-line eqeqeq
        ? unref(value) == unref(compared)
        : unref(value) === unref(compared)
    },
    /* c8 ignore next 3 */
    label() {
      return 'Values do not match'
    },
  }
}

sameAs.skip = SKIP_PROTO

export { sameAs }
