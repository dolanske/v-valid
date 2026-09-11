import { defineRule, skippable } from '../core/rule'
import { isNumber } from '../utils'

/**
 * @rule Value must be a number with a fractional part
 */
export const decimal = skippable(defineRule({
  name: 'decimal',
  validate: value => isNumber(value) && Number.isFinite(value) && !Number.isInteger(value),
  label: 'Value must be a decimal number',
}))
