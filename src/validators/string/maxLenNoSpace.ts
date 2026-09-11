import type { MaybeRefOrGetter } from '../../types'
import { defineRule, skippableFactory } from '../../core/rule'
import { isString, toValue } from '../../utils'
import { lengthWithoutSpaces } from './minLenNoSpace'

/**
 * @rule Value must be a string with at most `max` non-whitespace characters
 * @param max Maximum length excluding whitespace
 */
export const maxLenNoSpace = skippableFactory((max: MaybeRefOrGetter<number>) => defineRule({
  name: 'maxLenNoSpace',
  params: () => ({ max: toValue(max) }),
  validate: (value, { max }) => isString(value) && lengthWithoutSpaces(value) <= max,
  label: (value, { max }) => isString(value)
    ? `Value must have a length of at most ${max} excluding spaces`
    : 'Value must be a string',
}))
