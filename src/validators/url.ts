import { defineRule, skippable } from '../core/rule'
import { isString } from '../utils'

/**
 * @rule Value must be an absolute URL
 */
export const url = skippable(defineRule({
  name: 'url',
  validate: (value) => {
    if (!isString(value))
      return false
    try {
      return Boolean(new URL(value))
    }
    catch {
      return false
    }
  },
  label: 'Value must be a valid URL',
}))
