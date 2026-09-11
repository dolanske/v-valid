import type { MaybeRefOrGetter } from '../types'
import { defineRule, skippableFactory } from '../core/rule'
import { isDate, isNumber, toValue } from '../utils'

type Bound = number | Date

function toNumber(value: unknown): number {
  if (isNumber(value))
    return value
  if (isDate(value))
    return value.getTime()
  return Number.NaN
}

/**
 * @rule Value must be a number or Date within the range (inclusive)
 * @param min Lower bound
 * @param max Upper bound
 */
export const between = skippableFactory((min: MaybeRefOrGetter<Bound>, max: MaybeRefOrGetter<Bound>) => defineRule({
  name: 'between',
  params: () => ({ min: toValue(min), max: toValue(max) }),
  validate: (value, { min, max }) => {
    const num = toNumber(value)
    return num >= toNumber(min) && num <= toNumber(max)
  },
  label: (_, { min, max }) => `Value must be between ${min} and ${max}`,
}))
