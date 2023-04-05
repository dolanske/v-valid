import { isRef, reactive, unref, watch } from 'vue-demi'
import type { ComputedRef } from 'vue-demi'
import { cloneDeep, get, isPlainObject, set } from 'lodash-es'
import { parsePath } from '../utils'
import type {
  Error,
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
// Main validation composable

export function useValidation<F extends Record<string, any>, R extends Record<keyof F, any> | ComputedRef<Record<keyof F, any>>>(
  form: F,
  rules: R,
  { proactive = false, autoclear = false }: ValidationOptions = {},
) {
  type Errors = Record<keyof F, Error>

  const root = reactive<{
    anyError: boolean
    pending: boolean
    errors: Errors
  }>({ anyError: false, pending: false, errors: {} as Errors })

  if (autoclear) { watch(form, reset, { deep: true }) }
  else if (proactive) {
    watch(form, () => validate(), { deep: true })

    if (isRef(rules))
      watch(rules, () => validate(), { deep: true })
  }

  // Initial assignment
  reset()

  function _resetErrorObject() {
    iterateIn(form, (_a, _b, path) => {
      set<any>(root.errors, parsePath(path), cloneDeep(emptyErrorObject))
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
        set<any>(root.errors, path, cloneDeep(emptyErrorObject))

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

          set<any>(root.errors, `${path}.id`, key)
          set<any>(root.errors, `${path}.value`, value)

          if (!didPass) {
            root.anyError = true

            set<any>(root.errors, `${path}.invalid`, true)
            set<any>(root.errors, `${path}.errors.${ruleKey}`, label(value))
          }
        }

        return Promise.resolve()
      })

      root.pending = false

      // Expose errors object either way
      if (root.anyError)
        reject(root.errors)
      else
        resolve(root.errors as Errors)

      root.pending = false
    })
  }

  function addError(key: keyof F, error: { errorKey: string; message: string }) {
    // setWith(root.errors, )
    iterateIn(form, (_key, _, path) => {
      if (key === _key) {
        const parsedPath = parsePath(path)

        set<any>(root.errors, `${parsedPath}.errors.${error.errorKey}`, error.message)
        set<any>(root.errors, `${parsedPath}.invalid`, true)
      }
    })
  }

  return {
    reset,
    validate,
    addError,
    run: validate,
    errors: root.errors,
    $: root,
  }
}
