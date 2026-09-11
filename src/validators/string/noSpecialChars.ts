import { defineRule, skippable } from '../../core/rule'
import { specialCharsRegex } from '../../regex'
import { isString } from '../../utils'

/**
 * @rule Value must be a string made of letters and digits only
 */
export const noSpecialChars = skippable(defineRule({
  name: 'noSpecialChars',
  validate: value => isString(value) && !specialCharsRegex.test(value),
  label: value => isString(value)
    ? 'Value must not contain special characters'
    : 'Value must be a string',
}))
