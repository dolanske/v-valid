import type { MaybeRefOrGetter } from '../../types'
import { defineRule, skippableFactory } from '../../core/rule'
import { isString, toValue } from '../../utils'

/**
 * @rule Value must be a string ending with `search`
 * @param search Expected suffix
 * @param position Treat the value as if it were only this long
 */
export const endsWith = skippableFactory((search: MaybeRefOrGetter<string>, position?: number) => defineRule({
  name: 'endsWith',
  params: () => ({ search: toValue(search), position }),
  validate: (value, { search, position }) => isString(value) && value.endsWith(search, position),
  label: (value, { search }) => isString(value)
    ? `Value must end with '${search}'`
    : 'Value must be a string',
}))
