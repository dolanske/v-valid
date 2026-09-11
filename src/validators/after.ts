import type { MaybeRefOrGetter } from '../types'
import { defineRule, skippableFactory } from '../core/rule'
import { toValue } from '../utils'
import { toTime } from './before'

/**
 * @rule Value must be a date at or after `min`. Accepts Date objects,
 * timestamps and date strings.
 * @param min Earliest allowed date
 */
export const after = skippableFactory((min: MaybeRefOrGetter<Date | number | string>) => defineRule({
  name: 'after',
  params: () => ({ min: toValue(min) }),
  validate: (value, { min }) => toTime(value) >= toTime(min),
  label: (_, { min }) => `Date must be at or after ${min}`,
}))
