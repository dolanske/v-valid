import { defineRule, skippable } from '../core/rule'
import { isEmpty } from '../utils'

/**
 * @rule Value must be present: not `null`, `undefined`, `NaN`, an invalid
 * date, an empty string or an empty collection. `0` and `false` count as
 * present.
 */
export const required = skippable(defineRule({
  name: 'required',
  validate: value => !isEmpty(value),
  label: 'Value is required',
}))
