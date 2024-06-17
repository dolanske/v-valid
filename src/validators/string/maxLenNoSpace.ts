import { isNil } from 'lodash-es'
import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../../shared'
import type { ValidationRule } from '../../types'
import { noSpaceRegex } from '../../regex'

/**
 * @Rule Input must be a string and excluding spaces must be equal or lesser to the provided max value
 * @param max Maximum allowed length
 */

function maxLenNoSpace(max: number | Ref<number>): ValidationRule {
  return {
    _skip: false,
    name: 'maxLenNoSpace',

    validate: (value: string) => {
      if (isNil(value) || typeof value !== 'string')
        return false

      max = unref(max)
      const match = value.match(noSpaceRegex)

      if (!match)
        return false

      return match.length <= max
    },
    label: (value) => {
      if (typeof value !== 'string')
        return 'Value must be a string and '

      return `Value must have maximal lenght of ${unref(max)} excluding spaces`
    },
  }
}

maxLenNoSpace.skip = SKIP_PROTO

export { maxLenNoSpace }
