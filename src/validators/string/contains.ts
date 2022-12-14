import { isNil } from 'lodash-es'
import { SKIP_PROTO } from '../../shared'
import type { ValidationRule } from '../../types'

/**
 * @Rule Checks wether string input contains certain words or characters
 * @param toInclude Word(s) or character(s) to check for
 */
const contains = (toInclude: string | string[]): ValidationRule => {
  return {
    _skip: false,
    validate: (value) => {
      if (isNil(value) || typeof value !== 'string')
        return false

      // Split searched input into words
      if (typeof toInclude === 'string')
        toInclude = toInclude.trim().split(/\s+/)

      return toInclude.every((s: string) => value.toLowerCase().includes(s.toLowerCase()))
    },
    label: (value: any) => {
      // toInclude is either a string or an array of strings
      const vals = typeof toInclude === 'string' ? toInclude : toInclude.join(', ')

      if (typeof value !== 'string')
        return `Input must be a string and must contain <${vals}>`

      return `Input must contain <${vals}>`
    },
  }
}

contains.skip = SKIP_PROTO

export {
  contains,
}
