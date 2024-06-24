import { isNil } from 'lodash-es'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../../shared'
import type { ValidationRule } from '../../types'

/**
 * @Rule Checks wether string input contains certain words or characters
 * @param toInclude Word(s) or character(s) to check for
 * @param exact Should it split sentences into words or check against the entire string
 */
function contains(toInclude: string | string[], exact = false): ValidationRule {
  return {
    __skip: false,
    name: 'contains',
    validate: (value) => {
      if (isNil(value) || typeof value !== 'string')
        return false

      // Split searched input into words
      if (typeof toInclude === 'string')
        toInclude = !exact ? toInclude.trim().split(/\s+/) : [toInclude]

      return toInclude.every((s: string) => value.toLowerCase().includes(s.toLowerCase()))
    },
    label: (value: any) => {
      toInclude = unref(toInclude)

      // toInclude is either a string or an array of strings
      const vals = typeof toInclude === 'string' ? toInclude : toInclude.join(', ')

      if (typeof value !== 'string')
        return `Value must be a string and contain <${vals}>`

      return `Value must contain <${vals}>`
    },
  }
}

contains.skip = SKIP_PROTO

export {
  contains,
}
