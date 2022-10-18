import { isNil } from 'lodash'
import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../../shared'
import type { ValidationRule } from '../../types'
import { noSpaceRegex } from '../../regex'

/**
 * @Rule Input must be a string and excluding spaces must be equal or lesser to the provided max value
 * @param max Maximum allowed length
 */

const maxLenNoSpace = (max: number | Ref<number>): ValidationRule => {
  return {
    _skip: false,
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
        return 'Input must be a string and '

      return `Maximum allowed value excluding empty spaces is ${max}`
    },
  }
}

maxLenNoSpace.skip = SKIP_PROTO

export { maxLenNoSpace }
