import { isEmpty, isNil } from 'lodash-es'
import { SKIP_PROTO } from '../shared'
import type { ValidationRuleObject } from '../types'

/**
 * @Rule Input must not be empty, null or undefined.
 * If input is number with value 0, it will return true as value was provided
 */

export const required: ValidationRuleObject = {
  _skip: false,
  name: 'required',
  skip: SKIP_PROTO,
  validate: (value: any) => {
    // If value is missing in general
    if (isNil(value) || value === 'null' || value === 'undefined')
      return false

    // If value is string, check if length is > 0
    if (typeof value === 'string')
      return value.length > 0

    // If number has passed the nil check and it is a number
    // we can assume it is truthy, as idk how it would not be?
    if (typeof value === 'number')
      return true

    // For the last check, we look into Arrays, Objects, Maps and Sets
    return !isEmpty(value)
  },
  /* c8 ignore next 3 */
  label: () => {
    return 'Value is required'
  },
}
