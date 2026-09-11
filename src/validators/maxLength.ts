import type { MaybeRefOrGetter } from '../types'
import { defineRule, skippableFactory } from '../core/rule'
import { sizeOf, toValue } from '../utils'

/**
 * @rule Length of the value must be at most `max`. Works with strings,
 * arrays, Maps, Sets and plain objects.
 * @param max Maximum length
 */
export const maxLength = skippableFactory((max: MaybeRefOrGetter<number>) => defineRule({
  name: 'maxLength',
  params: () => ({ max: toValue(max) }),
  validate: (value, { max }) => sizeOf(value) <= max,
  label: (_, { max }) => `Value must have a length of at most ${max}`,
}))
