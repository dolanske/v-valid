import { reactive, watch } from "vue-demi"
import { merge } from "lodash"

import type { Errors, ValidationRule, Rule, ValidationOptions } from "./types"

/**
 *
 * @param form {Computed}
 * @param rules
 * @param options
 * @returns
 */

export function useValidation(
  form: object,
  rules: any,
  { proactive = false, autoclear = false }: ValidationOptions = {}
) {
  const errors = reactive<Errors>({})
  const root = reactive({ anyError: false, pending: false })

  if (autoclear) {
    watch(
      form,
      () => {
        reset()
      },
      { deep: true }
    )
  }

  if (proactive) {
    watch(
      form,
      () => {
        validate()
      },
      { deep: true }
    )
  }

  // Initial assignment
  reset()

  function _resetErrorObject() {
    merge(errors, {
      ...Object.keys(form).reduce(
        (a, v) => ({
          ...a,
          [v]: {
            type: null,
            invalid: false,
            errors: new Set()
          }
        }),
        {}
      )
    })

    Object.assign(root, { anyError: false, pending: false })
  }

  function reset() {
    // Resets the form
    _resetErrorObject()
  }

  async function validate() {
    reset()

    root.pending = true

    return new Promise<Errors>(async (resolve, reject) => {
      for (const [key, value] of Object.entries(form)) {
        if (!Reflect.has(rules.value, key)) continue

        const itemRules: Rule = rules.value[key]

        for (const [ruleKey, ruleData] of Object.entries(itemRules)) {
          const { _message, _validate }: ValidationRule = ruleData

          const result = await _validate(value)

          errors[key].type = ruleKey

          if (!result) {
            root.anyError = true
            errors[key].invalid = true
            errors[key].errors.add(_message(value))
          }
        }
      }

      // Expose errors object either way
      // REVIEW: Expand to include more useful information or whatever
      if (root.anyError) {
        reject(errors)
      } else {
        resolve(errors)
      }

      root.pending = false
    })
  }

  return {
    errors,
    reset,
    validate,
    status: root
  }
}
