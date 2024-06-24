import { isRef, reactive, ref, toRef, unref, watch } from 'vue-demi'
import type { ComputedRef } from 'vue-demi'
import { cloneDeep, get, isPlainObject, set } from 'lodash-es'
import { iterateIn, parsePath } from '../utils'
import type {
  DeepKeys,
  ReplacePrimitives,
  Rule,
  ValidationError,
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

// TODO
// Type errors object based on the form type

/**
 *
 * @param form Reactive object which will be validated
 * @param rules Object which includes rules appended to the keys which match the structure of the `form`
 *
 * Optionally, you can pass in an options object
 * - `proactive`: Boolean - perform validation on every form change
 * - `autoclear`: Boolean - reset changes on first input after validation
 */
export function useValidation<F extends Record<string, any>, R extends Partial<Record<keyof F, any>> | ComputedRef<Partial<Record<keyof F, any>>>>(
  form: F,
  rules: R,
  { proactive = false, autoclear = false }: ValidationOptions = {},
) {
  type Errors = ReplacePrimitives<F, ValidationError>

  const anyError = ref(false)
  const pending = ref(false)
  const errors = ref({} as Errors)

  // Internal state not meant to be available to the end user
  const state = reactive({
    // To improve speed, we do not perform autoclear when validation was
    // not performed yet
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

  function resetErrorObject() {
    iterateIn(form, (_a, _b, path) => {
      set(errors.value, parsePath(path), cloneDeep(emptyErrorObject))
    })
    Object.assign(state, { anyError: false, pending: false })
  }

  /**
   * Resets the validation object
   */
  function reset() {
    state.didValidate = false
    // Resets the form
    resetErrorObject()
  }

  // TODO
  // Fully type rulesToOnlyValidate to only include actual available keys

  /**
   * Performs the form validation by running all user provided rules
   * against the form data.
   * @returns Promise which resolves with the validation results
   */
  async function validate(...rulesToOnlyValidate: string[]) {
    reset()
    pending.value = true

    // eslint-disable-next-line no-async-promise-executor
    return new Promise<Errors>(async (resolve, reject) => {
      await iterateIn(form, async (key, value, path) => {
        path = parsePath(path)

        // Create an errors object following the structure of the form
        set<any>(errors.value, path, cloneDeep(emptyErrorObject))

        // Get all rules for an object
        const _rules = unref(rules)
        // Get the specific rules for the current form Key
        const pathRules: Rule = get(_rules, path)

        if (!pathRules)
          return

        // Iterate over available rules for a key and perform validation
        // TODO:
        // Here we could perform a serialization into an array, depending if an array of rules was input or an object
        for (const [ruleKey, ruleData] of Object.entries(pathRules)) {
          if (rulesToOnlyValidate.length > 0 && !rulesToOnlyValidate.includes(ruleKey))
            continue

          const { label, validate, __skip }: ValidationRule = ruleData

          if (__skip)
            continue

          const passed = await validate(value)

          set<any>(errors.value, `${path}.id`, key)
          set<any>(errors.value, `${path}.value`, value)

          if (!passed) {
            anyError.value = true

            set<any>(errors.value, `${path}.invalid`, true)
            set<any>(errors.value, `${path}.errors.${ruleKey}`, label(value))
          }
        }

        return Promise.resolve()
      })

      pending.value = false
      state.didValidate = true

      // Expose errors object either way
      if (anyError.value)
        reject(errors.value)
      else
        resolve(errors.value as Errors)
    })
  }

  /**
   * Appends a new error key and its message to the errors object.
   */
  function addError(path: DeepKeys<F>, error: { key: string, message: string }) {
    set<any>(errors.value, `${path}.errors.${error.key}`, error.message)
    set<any>(errors.value, `${path}.invalid`, true)
  }

  return {
    reset,
    validate,
    addError,
    errors,
    anyError,
    pending,
  }
}
