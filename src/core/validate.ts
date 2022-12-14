import type { ComputedRef } from 'vue-demi'
import { isRef, reactive, unref, watch } from 'vue-demi'
import { cloneDeep, get, isPlainObject, set } from 'lodash-es'
import { parsePath } from '../utils'
import type {
  Error,
  Errors,
  Rule,
  ValidationOptions,
  ValidationRule,
} from '../types'

//* ---------------- SECTION ----------------*/
// Setup and helpers

export const emptyErrorObject: Error = {
  id: null,
  value: null,
  invalid: false,
  errors: {},
}

export async function iterateIn(
  obj: Record<string, any>,
  callback: (key: string, value: any, path: string) => Promise<void> | void,
  path = '',
): Promise<void> {
  for (const key in obj) {
    const newPath = `${path} ${key}`

    if (isPlainObject(obj[key]))
      iterateIn(obj[key], callback, newPath)
    else
      await callback(key, obj[key], newPath)
  }
}

//* ---------------- SECTION ----------------*/
// Main validation method

export function useValidation(
  form: Record<string, any>,
  rules: ComputedRef<Record<string, any>> | Record<string, any>,
  { proactive = false, autoclear = false }: ValidationOptions = {},
) {
  const root = reactive<{
    anyError: boolean
    pending: boolean
    errors: Errors
  }>({ anyError: false, pending: false, errors: {} })

  if (autoclear) { watch(form, () => reset(), { deep: true }) }
  else if (proactive) {
    watch(form, () => validate(), { deep: true })

    if (isRef(rules))
      watch(rules, () => validate(), { deep: true })
  }

  // Initial assignment
  reset()

  function _resetErrorObject() {
    iterateIn(root.errors, (a, b, path) => {
      set(root.errors, path, cloneDeep(emptyErrorObject))
    })
    Object.assign(root, { anyError: false, pending: false })
  }

  function reset() {
    // Resets the form
    _resetErrorObject()
  }

  async function validate(...validateOnly: string[]) {
    reset()

    root.pending = true

    // eslint-disable-next-line no-async-promise-executor
    return new Promise<Errors>(async (resolve, reject) => {
      await iterateIn(form, async (key, value, path) => {
        path = parsePath(path)

        // Create an errors object following the structure of the form
        set(root.errors, path, cloneDeep(emptyErrorObject))

        // Get all rules for an object
        const _rules = unref(rules)
        const pathRules: Rule = get(_rules, path)

        if (!pathRules)
          return

        // Iterate over available rules and perform validation
        for (const [ruleKey, ruleData] of Object.entries(pathRules)) {
          if (validateOnly.length > 0 && !validateOnly.includes(ruleKey))
            continue

          const { label, validate, _skip }: ValidationRule = ruleData

          if (_skip)
            continue

          const didPass = await validate(value)

          set(root.errors, `${path}.id`, key)
          set(root.errors, `${path}.value`, value)

          if (!didPass) {
            root.anyError = true

            set(root.errors, `${path}.invalid`, true)
            set(root.errors, `${path}.errors.${ruleKey}`, label(value))
          }
        }

        return Promise.resolve()
      })

      root.pending = false

      // Expose errors object either way
      if (root.anyError)
        reject(root.errors)
      else
        resolve(root.errors)

      root.pending = false
    })
  }

  return {
    reset,
    validate,

    root,

    // Nice names
    errors: root.errors,
    run: validate,
  }
}
