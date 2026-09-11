import type { Ref } from 'vue'

export type MaybePromise<T> = T | Promise<T>
export type MaybeRef<T> = T | Ref<T>
export type MaybeRefOrGetter<T> = T | Ref<T> | (() => T)

/**
 * What a rule's `validate` may return.
 *
 * - `true` – the value passed
 * - `false` – the value failed, the rule's `label` is used as the message
 * - `string` – the value failed and the string is used as the message
 */
export type RuleResult = boolean | string

/**
 * Error message or a function producing it. Receives the validated value and
 * the rule's resolved parameters (if it has any).
 */
export type Label<P = any> = string | ((value: any, params: P) => string)

export interface ValidationRule<P = any> {
  /**
   * Rule name. Used as the error key when rules are provided as an array.
   */
  name: string
  /**
   * Runs the check. May be asynchronous.
   */
  validate: (value: any) => MaybePromise<RuleResult>
  /**
   * Produces the error message for a failed check.
   */
  label: (value: any, params: P) => string
  /**
   * Returns the rule's parameters with refs and getters resolved. Passed to
   * `label` so messages can reflect live values, and read by the `proactive`
   * watcher so that changing a parameter re-validates the form.
   */
  params: () => P
  /**
   * Skipped rules are never run and never produce errors.
   */
  skipped?: boolean
}

/**
 * A rule without parameters. Call `.skip()` to get a skipped copy.
 */
export interface RuleObject<P = any> extends ValidationRule<P> {
  skip: () => ValidationRule<P>
}

/**
 * A rule with parameters. Call `.skip(...args)` to get a skipped copy.
 */
export type RuleFactory<A extends any[], P = any> = ((...args: A) => ValidationRule<P>) & {
  skip: (...args: A) => ValidationRule<P>
}

/**
 * A rule, or something falsy to leave out. Lets you write
 * `{ email: form.needsEmail && email }` or spread conditionally.
 */
export type RuleEntry = ValidationRule | undefined | null | false

/**
 * The set of rules applied to a single form field. Either an object where the
 * key becomes the error key, or an array where the rule's `name` is used.
 */
export type RuleGroup = Record<string, RuleEntry> | RuleEntry[]

export interface ValidationError {
  /**
   * Form property name (last segment of `path`)
   */
  id: string
  /**
   * Dot separated path of the field within the form
   */
  path: string
  /**
   * The value that was validated
   */
  value: any
  /**
   * Whether any rule failed
   */
  invalid: boolean
  /**
   * Failed rules keyed by rule key, value is the message
   */
  errors: Record<string, string>
  /**
   * Flat list of messages in rule order, for easy consumption by UI libraries
   */
  messages: string[]
}

export interface ValidationOptions {
  /**
   * Re-run validation whenever the form (or rules) change
   */
  proactive?: boolean
  /**
   * Clear all errors on the first form change after `validate()` ran
   */
  autoclear?: boolean
  /**
   * Stop at the first failing rule of each field instead of running them all.
   * Rules run in definition order.
   */
  bail?: boolean
}

/**
 * Values that are validated as a whole rather than recursed into
 */
export type Leaf =
  | string | number | boolean | bigint | symbol | null | undefined
  | Date | RegExp | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>
  | readonly unknown[]
  | ((...args: any[]) => any)

/**
 * Strips `null` and `undefined` from optional objects so they still map to
 * nested rules / errors, but leaves fields typed as exactly `null` alone.
 */
type NonNil<T> = [NonNullable<T>] extends [never] ? T : NonNullable<T>

/**
 * Rules shaped like the form `T`. Every property is optional. A rule group can
 * be attached to a nested object as well, in which case the object is
 * validated as a single value.
 */
export type RulesFor<T> = T extends Leaf
  ? RuleGroup
  : RuleGroup | { [K in keyof T]?: RulesFor<NonNil<T[K]>> }

/**
 * Error object shaped like the form `T`
 */
export type ErrorsFor<T> = T extends Leaf
  ? ValidationError
  : { [K in keyof T]-?: ErrorsFor<NonNil<T[K]>> }

/**
 * Union of every dot separated path in `T`, including intermediate objects
 */
export type Path<T> = T extends Leaf
  ? never
  : { [K in keyof T & string]: K | `${K}.${Path<NonNil<T[K]>>}` }[keyof T & string]
