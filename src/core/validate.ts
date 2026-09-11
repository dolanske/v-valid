import { ref, shallowRef, triggerRef, watch } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import type {
  ErrorsFor,
  MaybeRef,
  MaybeRefOrGetter,
  Path,
  RuleGroup,
  RulesFor,
  ValidationError,
  ValidationOptions,
  ValidationRule,
} from '../types'
import type { PathSegments } from '../utils'
import { getIn, isArray, isNil, isPathPrefix, isPlainObject, isPromise, setIn, toSegments, toValue } from '../utils'
import { isRule, runRule } from './rule'

type ErrorTree = Record<string, any>

function createErrorEntry(path: PathSegments, value: unknown): ValidationError {
  return {
    id: path[path.length - 1],
    path: path.join('.'),
    value,
    invalid: false,
    errors: {},
    messages: [],
  }
}

function isErrorEntry(node: unknown): node is ValidationError {
  return isPlainObject(node) && isArray(node.messages) && 'invalid' in node
}

/**
 * Builds an error tree mirroring the form, with every leaf valid
 */
function createErrorTree(form: unknown, path: PathSegments = []): ErrorTree {
  const tree: ErrorTree = {}
  if (!isPlainObject(form))
    return tree

  for (const key in form) {
    const value = form[key]
    const childPath = [...path, key]
    tree[key] = isPlainObject(value)
      ? createErrorTree(value, childPath)
      : createErrorEntry(childPath, toValue(value))
  }

  return tree
}

/**
 * Calls `callback` for every error entry in the tree
 */
function forEachEntry(tree: ErrorTree, callback: (entry: ValidationError, path: PathSegments) => void, path: PathSegments = []) {
  for (const key in tree) {
    const node = tree[key]
    const childPath = [...path, key]
    if (isErrorEntry(node))
      callback(node, childPath)
    else if (isPlainObject(node))
      forEachEntry(node, callback, childPath)
  }
}

/**
 * Falsy entries are allowed in rule groups so rules can be left out
 * conditionally, e.g. `{ email: form.needsEmail && email }`
 */
function isOmitted(node: unknown): node is undefined | null | false {
  return isNil(node) || node === false
}

function isRuleGroup(node: unknown): node is RuleGroup {
  if (isArray(node))
    return true
  if (!isPlainObject(node))
    return false
  for (const key in node) {
    if (isRule(node[key]))
      return true
  }
  return false
}

function invalidRule(path: PathSegments, node: unknown, expected: string) {
  const got = isPromise(node) ? 'a Promise' : `type ${typeof node}`
  return new TypeError(`[v-valid] Invalid rule at "${path.join('.')}": expected ${expected}, got ${got}`)
}

/**
 * Calls `callback` for every rule group in the rules tree along with its path
 */
function forEachRuleGroup(rules: unknown, callback: (path: PathSegments, group: RuleGroup) => void, path: PathSegments = []) {
  if (!isPlainObject(rules))
    return

  for (const key in rules) {
    const node = rules[key]
    const childPath = [...path, key]

    if (isOmitted(node))
      continue
    if (isRuleGroup(node))
      callback(childPath, node)
    else if (isPlainObject(node))
      forEachRuleGroup(node, callback, childPath)
    else
      throw invalidRule(childPath, node, 'a validation rule or nested rules')
  }
}

/**
 * Turns a rule group into an ordered list of `[key, rule]` pairs. Array items
 * are keyed by rule name; duplicate names get their index appended.
 */
function normalizeGroup(group: RuleGroup, path: PathSegments): Array<[string, ValidationRule]> {
  const entries: Array<[string, ValidationRule]> = []
  const seen = new Set<string>()

  const items: Array<[string, unknown]> = isArray(group)
    ? group.map((rule, index) => [isRule(rule) ? rule.name : String(index), rule])
    : Object.entries(group)

  items.forEach(([name, rule], index) => {
    if (isOmitted(rule))
      return
    if (!isRule(rule))
      throw invalidRule([...path, name], rule, 'a validation rule')
    const key = seen.has(name) ? `${name}${index}` : name
    seen.add(key)
    entries.push([key, rule])
  })

  return entries
}

/**
 * Reads the parameters of every rule. Called inside a watcher so that refs
 * and getters used by rules (`minLength(min)`, `sameAs(() => form.password)`,
 * `validateIf(flag, ...)`) become reactive dependencies.
 */
function touchRuleParams(rules: unknown) {
  forEachRuleGroup(rules, (_, group) => {
    const items = isArray(group) ? group : Object.values(group)
    for (const rule of items) {
      if (isRule(rule))
        rule.params?.()
    }
  })
}

async function validateEntry(entry: ValidationError, rules: Array<[string, ValidationRule]>, bail: boolean) {
  const fail = (key: string, message: string) => {
    entry.invalid = true
    entry.errors[key] = message
    entry.messages.push(message)
  }

  if (bail) {
    for (const [key, rule] of rules) {
      const result = await runRule(rule, entry.value)
      if (result !== true) {
        fail(key, result)
        break
      }
    }
    return
  }

  const results = await Promise.all(rules.map(([, rule]) => runRule(rule, entry.value)))
  results.forEach((result, index) => {
    if (result !== true)
      fail(rules[index][0], result)
  })
}

export interface ValidationContext<F extends object> {
  /**
   * Runs the rules against the form. Resolves with `true` when everything
   * passed. Pass one or more field paths to validate only those fields; errors
   * of the other fields are left untouched.
   */
  validate: (...paths: Path<F>[]) => Promise<boolean>
  /**
   * Clears every error and marks the form as not validated
   */
  reset: () => void
  /**
   * Adds an error to a field, for example one returned by a server
   */
  addError: (path: Path<F>, error: { key: string, message: string }) => void
  /**
   * Validation results, shaped like the form
   */
  errors: ShallowRef<ErrorsFor<F>>
  /**
   * Whether any field is currently invalid
   */
  anyError: Ref<boolean>
  /**
   * Whether a validation run is in progress
   */
  pending: Ref<boolean>
  /**
   * Whether `validate()` has completed since the last `reset()`
   */
  validated: Ref<boolean>
}

/**
 * Creates a validation context for a form.
 *
 * @param form Reactive form object (or a ref to one)
 * @param rules Rules shaped like the form. Can be a plain object, a ref, a
 * computed or a getter. Refs and getters are re-read on every validation.
 * @param options
 * - `proactive` re-validate on every form change
 * - `autoclear` clear errors on the first change after validation
 * - `bail` stop at the first failing rule of each field
 */
export function useValidation<F extends object>(
  form: Ref<F>,
  rules: MaybeRefOrGetter<RulesFor<F>>,
  options?: ValidationOptions,
): ValidationContext<F>
export function useValidation<F extends object>(
  form: F,
  rules: MaybeRefOrGetter<RulesFor<F>>,
  options?: ValidationOptions,
): ValidationContext<F>
export function useValidation<F extends object>(
  form: MaybeRef<F>,
  rules: MaybeRefOrGetter<RulesFor<F>>,
  options: ValidationOptions = {},
): ValidationContext<F> {
  const { proactive = false, autoclear = false, bail = false } = options

  const errors = shallowRef(createErrorTree(toValue(form))) as ShallowRef<ErrorsFor<F>>
  const anyError = ref(false)
  const pending = ref(false)
  const validated = ref(false)

  // Incremented on every run and reset so that a slow, superseded validation
  // never overwrites the results of a newer one
  let runId = 0

  if (autoclear) {
    watch(form, () => {
      if (validated.value)
        reset()
    }, { deep: true })
  }
  else if (proactive) {
    watch(form, () => validate(), { deep: true })
    watch(() => {
      const current = toValue(rules)
      touchRuleParams(current)
      return current
    }, () => validate(), { deep: true })
  }

  function reset() {
    runId++
    validated.value = false
    anyError.value = false
    pending.value = false
    errors.value = createErrorTree(toValue(form)) as ErrorsFor<F>
  }

  async function validate(...paths: Path<F>[]): Promise<boolean> {
    const run = ++runId
    pending.value = true

    const formValue = toValue(form)
    const selectors = paths.map(toSegments)
    const isSelected = (path: PathSegments) =>
      selectors.length === 0 || selectors.some(selector => isPathPrefix(selector, path))

    const tree = createErrorTree(formValue)

    // Partial validation keeps the previous results of unselected fields
    if (selectors.length > 0) {
      forEachEntry(errors.value, (entry, path) => {
        if (!isSelected(path))
          setIn(tree, path, entry)
      })
    }

    const jobs: Promise<void>[] = []

    forEachRuleGroup(toValue(rules), (path, group) => {
      if (!isSelected(path))
        return

      const entry = createErrorEntry(path, toValue(getIn(formValue, path)))
      setIn(tree, path, entry)
      jobs.push(validateEntry(entry, normalizeGroup(group, path), bail))
    })

    try {
      await Promise.all(jobs)
    }
    finally {
      if (run === runId)
        pending.value = false
    }

    let valid = true
    forEachEntry(tree, (entry) => {
      if (entry.invalid)
        valid = false
    })

    // A newer run or a reset happened while we were waiting
    if (run !== runId)
      return valid

    errors.value = tree as ErrorsFor<F>
    anyError.value = !valid
    validated.value = true

    return valid
  }

  function addError(path: Path<F>, error: { key: string, message: string }) {
    const segments = toSegments(path)
    let entry = getIn(errors.value, segments)

    if (!isErrorEntry(entry)) {
      entry = createErrorEntry(segments, getIn(toValue(form), segments))
      setIn(errors.value, segments, entry)
    }

    const previous = entry.errors[error.key]
    if (previous !== undefined) {
      const index = entry.messages.indexOf(previous)
      if (index !== -1)
        entry.messages.splice(index, 1)
    }

    entry.invalid = true
    entry.errors[error.key] = error.message
    entry.messages.push(error.message)
    anyError.value = true
    triggerRef(errors)
  }

  return {
    validate,
    reset,
    addError,
    errors,
    anyError,
    pending,
    validated,
  }
}
