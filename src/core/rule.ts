import type { Label, MaybePromise, RuleFactory, RuleObject, RuleResult, ValidationRule } from '../types'
import { chain, isFunction, isNil, isString, toValue } from '../utils'

const DEFAULT_LABEL = 'Value does not satisfy the validation rule.'

interface RuleDefinition<P> {
  name: string
  /**
   * Resolves the live parameters. Called once per validation and once per
   * label so refs and getters passed to a rule stay reactive.
   */
  params?: () => P
  validate: (value: any, params: P) => MaybePromise<RuleResult>
  label?: Label<P>
}

/**
 * Builds a rule from a definition. Internal building block for every validator
 * and for `createRule` / `createRuleArg`.
 */
export function defineRule<P = undefined>(definition: RuleDefinition<P>): ValidationRule<P> {
  const { name, validate, label } = definition
  const params = definition.params ?? (() => undefined as P)

  return {
    name,
    params,
    validate: value => validate(value, params()),
    label: (value, resolved = params()) => {
      if (isNil(label))
        return DEFAULT_LABEL
      return isString(label) ? label : label(value, resolved)
    },
  }
}

/**
 * Returns a copy of the rule which is never run
 */
export function skip<R extends ValidationRule>(rule: R): R {
  return { ...rule, skipped: true }
}

/**
 * Attaches `.skip()` to a parameterless rule
 */
export function skippable<P>(rule: ValidationRule<P>): RuleObject<P> {
  return Object.assign(rule, { skip: () => skip(rule) })
}

/**
 * Attaches `.skip(...args)` to a rule factory
 */
export function skippableFactory<A extends any[], P>(factory: (...args: A) => ValidationRule<P>): RuleFactory<A, P> {
  return Object.assign(factory, { skip: (...args: A) => skip(factory(...args)) })
}

/**
 * Runs a single rule and normalizes the result to `true` or an error message.
 * Skipped rules always pass. Stays synchronous if the rule is synchronous.
 */
export function runRule(rule: ValidationRule, value: unknown): MaybePromise<true | string> {
  if (rule.skipped)
    return true

  return chain(rule.validate(value), (result): true | string => {
    if (result === true)
      return true
    return isString(result) ? result : rule.label(value, rule.params?.())
  })
}

/**
 * Returns `true` if the value is a validation rule
 */
export function isRule(value: unknown): value is ValidationRule {
  return !isNil(value) && typeof value === 'object' && isFunction((value as any).validate)
}

/**
 * Creates a rule without parameters.
 *
 * ```ts
 * const isEven = createRule(value => value % 2 === 0, 'Value must be even', 'isEven')
 * ```
 *
 * @param validate Returns `true` to pass, `false` to fail with `label`, or a
 * string to fail with that string as the message. May be async.
 * @param label Message or message callback receiving the value
 * @param name Rule name, used as the error key when rules are given as an array
 */
export function createRule(
  validate: (value: any) => MaybePromise<RuleResult>,
  label?: Label<undefined>,
  name = 'custom',
): RuleObject<undefined> {
  return skippable(defineRule({ name, validate, label }))
}

/**
 * Parameter object with refs and getters replaced by their value type
 */
export type Resolved<P> = {
  [K in keyof P]: P[K] extends () => infer R ? R : P[K] extends { value: infer V } ? V : P[K]
}

/**
 * Creates a rule factory which takes a parameter object. Refs and getters in
 * the parameters are resolved before they reach `validate` and `label`.
 *
 * ```ts
 * const arrayBetween = createRuleArg<{ min: number, max: number }>(
 *   (value, { min, max }) => Array.isArray(value) && value.length >= min && value.length <= max,
 *   (_, { min, max }) => `Array must have between ${min} and ${max} items`,
 *   'arrayBetween',
 * )
 *
 * const rules = { tags: { arrayBetween: arrayBetween({ min: 1, max: 5 }) } }
 * ```
 */
export function createRuleArg<P extends Record<string, any>>(
  validate: (value: any, params: Resolved<P>) => MaybePromise<RuleResult>,
  label?: Label<Resolved<P>>,
  name = 'custom',
): RuleFactory<[params: P], Resolved<P>> {
  return skippableFactory((params: P) => defineRule<Resolved<P>>({
    name,
    params: () => {
      const resolved: Record<string, any> = {}
      for (const key in params)
        resolved[key] = toValue(params[key])
      return resolved as Resolved<P>
    },
    validate,
    label,
  }))
}
