import { isRef, reactive, unref, watch } from 'vue-demi'
import type { ComputedRef } from 'vue-demi'
import { cloneDeep, get, isPlainObject, set } from 'lodash-es'
import { parsePath } from '../utils'
import type {
  ValidationError,
  Rule,
  ValidationOptions,
  ValidationRule,
} from '../types'

// Default object
export const emptyErrorObject: ValidationError = {
  id: null,
  value: null,
  invalid: false,
  errors: {},
}

// Deep object iterator
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

/**
 *
 * @param form Reactive object which will be validated
 * @param rules Object which includes rules appended to the keys which match the structure of the `form`
 *
 * Optionally, you can pass in an options object
 * - `proactive`: Boolean - perform validation on every form change
 * - `autoclear`: Boolean - clear
 */
export function useValidation<F extends Record<string, any>, R extends Partial<Record<keyof F, any>> | ComputedRef<Partial<Record<keyof F, any>>>>(
  form: F,
  rules: R,
  { proactive = false, autoclear = false }: ValidationOptions = {},
) {
  type Errors = Record<keyof F, ValidationError>

  const state = reactive<{
    anyError: boolean
    pending: boolean
    errors: Errors
    didValidate: boolean
  }>({
    anyError: false,
    pending: false,
    errors: {} as Errors,
    // To improve speed, we do not perform autoclear when validation was
    // not performed  yet
    didValidate: false,
  })

  if (autoclear) {
    watch(form, () => {
      if (state.didValidate)
        reset()
    }, { deep: true })
  }
  else if (proactive) {
    watch(form, () => validate(), { deep: true })

    // In case rules object is a REF, we can expect it might update If
    // it does, perform validation too
    if (isRef(rules))
      watch(rules, () => validate(), { deep: true })
  }

  // Initial assignment
  reset()

  function _resetErrorObject() {
    iterateIn(form, (_a, _b, path) => {
      set<any>(state.errors, parsePath(path), cloneDeep(emptyErrorObject))
    })
    Object.assign(state, { anyError: false, pending: false })
  }

  /**
   * Resets the validation object
   */
  function reset() {
    state.didValidate = false
    // Resets the form
    _resetErrorObject()
  }

  /**
   * Performs the form validation by running all user provided rules
   * against the form data.
   * @returns Promise which resolves with the validation results
   */
  async function validate(...rulesToOnlyValidate: string[]) {
    reset()
    state.pending = true

    // eslint-disable-next-line no-async-promise-executor
    return new Promise<Errors>(async (resolve, reject) => {
      await iterateIn(form, async (key, value, path) => {
        path = parsePath(path)

        // Create an errors object following the structure of the form
        set<any>(state.errors, path, cloneDeep(emptyErrorObject))

        // Get all rules for an object
        const _rules = unref(rules)
        const pathRules: Rule = get(_rules, path)

        if (!pathRules)
          return

        // Iterate over available rules and perform validation
        for (const [ruleKey, ruleData] of Object.entries(pathRules)) {
          if (rulesToOnlyValidate.length > 0 && !rulesToOnlyValidate.includes(ruleKey))
            continue

          const { label, validate, _skip }: ValidationRule = ruleData

          if (_skip)
            continue

          const didPass = await validate(value)

          set<any>(state.errors, `${path}.id`, key)
          set<any>(state.errors, `${path}.value`, value)

          if (!didPass) {
            state.anyError = true

            set<any>(state.errors, `${path}.invalid`, true)
            set<any>(state.errors, `${path}.errors.${ruleKey}`, label(value))
          }
        }

        return Promise.resolve()
      })

      state.pending = false
      state.didValidate = true

      // Expose errors object either way
      if (state.anyError)
        reject(state.errors)
      else
        resolve(state.errors as Errors)
    })
  }

  /**
   * Appends a new error key and its message to the errors object.
   * @returns Promise which resolves when new error item is appended
   */
  function addError(key: keyof F, error: { errorKey: string; message: string }) {
    return iterateIn(form, (_key, _, path) => {
      if (key === _key) {
        const parsedPath = parsePath(path)
        set<any>(state.errors, `${parsedPath}.errors.${error.errorKey}`, error.message)
        set<any>(state.errors, `${parsedPath}.invalid`, true)
      }
    })
  }

  return {
    reset,
    validate,
    run: validate,
    addError,
    errors: state.errors,
    $: state,
  }
}
