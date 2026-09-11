import type { MaybeRefOrGetter } from '../types'
import { defineRule, skippableFactory } from '../core/rule'
import { isString, toValue } from '../utils'

/**
 * @rule Value must match the regular expression
 * @param regex Regular expression or pattern string
 */
export const match = skippableFactory((regex: MaybeRefOrGetter<RegExp | string>) => defineRule({
  name: 'match',
  params: () => {
    const pattern = toValue(regex)
    return { regex: isString(pattern) ? new RegExp(pattern) : pattern }
  },
  validate: (value, { regex }) => {
    if (!isString(value))
      return false
    // Reset stateful (global / sticky) expressions so repeated runs agree
    regex.lastIndex = 0
    return regex.test(value)
  },
  label: (_, { regex }) => `Value must match ${regex}`,
}))
