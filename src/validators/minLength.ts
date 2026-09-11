import type { MaybeRefOrGetter } from '../types'
import { defineRule, skippableFactory } from '../core/rule'
import { sizeOf, toValue } from '../utils'

/**
 * @rule Length of the value must be at least `min`. Works with strings,
 * arrays, Maps, Sets and plain objects.
 * @param min Minimum length
 */
export const minLength = skippableFactory((min: MaybeRefOrGetter<number>) => defineRule({
  name: 'minLength',
  params: () => ({ min: toValue(min) }),
  validate: (value, { min }) => sizeOf(value) >= min,
  label: (_, { min }) => `Value must have a length of at least ${min}`,
}))
