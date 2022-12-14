import { isNil } from 'lodash-es'
import type { Label, ValidationRule } from '../types'

/**
 *
 * Helper method which adds custom message to any validation.
 *
 * ```ts
 * minLength: withLabel("Too short!", minLength(10))
 * ```
 *
 * @param message Custom message to display in the returned error
 * @param validator Validation rule
 */

export const $withLabel = (
  message: string | Label,
  validator: ValidationRule,
): ValidationRule => {
  const { validate, _skip } = validator

  if (isNil(validate))
    throw new Error('[withLabel] Missing validator function')

  return {
    _skip,
    validate,
    label: (args) => {
      if (typeof message === 'string')
        return message
      return message(args)
    },
  }
}
