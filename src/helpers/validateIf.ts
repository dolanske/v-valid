// import { isBoolean, isFunction } from 'lodash-es'
import type { Ref } from 'vue-demi'
import { isRef } from 'vue-demi'
import type { ValidationRule } from '../types'
import { SKIP_PROTO } from '../shared'
import { isBoolean, isFunction } from '../utils'

/**
 * @Rule Perform validation if provided condition is met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */

export function $validateIf(condition: boolean | (() => boolean) | Ref<boolean> | Promise<boolean>, rule: ValidationRule): ValidationRule | Promise<ValidationRule> {
  // Boolean
  if (isBoolean(condition))
    return condition ? rule : SKIP_PROTO()

  // ref
  if (isRef(condition))
    return condition.value ? rule : SKIP_PROTO()

  // Function returning boolean
  if (isFunction(condition))
    return condition() ? rule : SKIP_PROTO()

  return condition.then((result) => {
    return result ? rule : SKIP_PROTO()
  })
}
