import type { MaybeRefOrGetter } from '../types'
import { defineRule, skippableFactory } from '../core/rule'
import { isDate, isNumber, isString, toValue } from '../utils'

/**
 * Timestamp of a Date, number or date string. `NaN` when it is not a date, so
 * every comparison fails.
 */
export function toTime(value: unknown): number {
  if (isDate(value))
    return value.getTime()
  if (isNumber(value) || isString(value))
    return new Date(value).getTime()
  return Number.NaN
}

/**
 * @rule Value must be a date at or before `max`. Accepts Date objects,
 * timestamps and date strings.
 * @param max Latest allowed date
 */
export const before = skippableFactory((max: MaybeRefOrGetter<Date | number | string>) => defineRule({
  name: 'before',
  params: () => ({ max: toValue(max) }),
  validate: (value, { max }) => toTime(value) <= toTime(max),
  label: (_, { max }) => `Date must be at or before ${max}`,
}))
