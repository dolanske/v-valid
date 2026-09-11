import type { MaybeRefOrGetter } from '../../types'
import { defineRule, skippableFactory } from '../../core/rule'
import { isString, toValue } from '../../utils'

/**
 * @rule Value must be a string starting with `search`
 * @param search Expected prefix
 * @param position Index in the value at which the prefix is expected
 */
export const startsWith = skippableFactory((search: MaybeRefOrGetter<string>, position?: number) => defineRule({
  name: 'startsWith',
  params: () => ({ search: toValue(search), position }),
  validate: (value, { search, position }) => isString(value) && value.startsWith(search, position),
  label: (value, { search }) => isString(value)
    ? `Value must start with '${search}'`
    : 'Value must be a string',
}))
