import { defineRule, skippable } from '../core/rule'
import { emailRegex } from '../regex'
import { isString } from '../utils'

/**
 * @rule Value must be a valid email address
 */
export const email = skippable(defineRule({
  name: 'email',
  validate: value => isString(value) && emailRegex.test(value),
  label: 'Value must be a valid email address',
}))
