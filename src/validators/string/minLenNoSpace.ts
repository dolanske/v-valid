import type { MaybeRefOrGetter } from '../../types'
import { defineRule, skippableFactory } from '../../core/rule'
import { whitespaceRegex } from '../../regex'
import { isString, toValue } from '../../utils'

export function lengthWithoutSpaces(value: string) {
  return value.replace(whitespaceRegex, '').length
}

/**
 * @rule Value must be a string with at least `min` non-whitespace characters
 * @param min Minimum length excluding whitespace
 */
export const minLenNoSpace = skippableFactory((min: MaybeRefOrGetter<number>) => defineRule({
  name: 'minLenNoSpace',
  params: () => ({ min: toValue(min) }),
  validate: (value, { min }) => isString(value) && lengthWithoutSpaces(value) >= min,
  label: (value, { min }) => isString(value)
    ? `Value must have a length of at least ${min} excluding spaces`
    : 'Value must be a string',
}))
