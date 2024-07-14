import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../../shared'
import type { ValidationRule } from '../../types'
import { noSpaceRegex } from '../../regex'
import { isNil } from '../../utils'

/**
 * @Rule Input must be a string and excluding spaces must be equal or greater to the provided min value
 * @param min Minimum allowed length
 */

function minLenNoSpace(min: number | Ref<number>): ValidationRule {
  return {
    name: 'minLenNoSpace',

    __skip: false,
    validate: (value: string) => {
      if (isNil(value) || typeof value !== 'string')
        return false

      min = unref(min)
      const match = value.match(noSpaceRegex)

      if (!match)
        return false

      return match.length >= min
    },
    /* c8 ignore next 3 */
    label: () => {
      return `Value must have minimal lenght of ${unref(min)} excluding spaces`
    },
  }
}

minLenNoSpace.skip = SKIP_PROTO

export { minLenNoSpace }
