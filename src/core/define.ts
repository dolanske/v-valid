import { isNil } from 'lodash-es'
import { SKIP_PROTO } from '../shared'
import type { ValidationRule, ValidationRuleObject } from '../types'

// REVIEW: Is this the best way to define this API

/**
 * Helper used to create custom validation rules
 *
 * @param rule Custom rule method which must return a boolean
 * @param label Custom message or message callback to display in the returned
 * error. Label callback exposes the validated value and all rule parameters
 *
 */

const DEFAULT_LABEL = 'Value does not satisfy the validation rule.'
type DefLabel = string | ((value: any) => string)

/**
 * Simple rule definition. This method takes in a method wihout params and returns a simple rule.
 * This rule is 'as is' and does not take in any parameters nor can it be called.
 */

function $def(rule: (value: any) => boolean | Promise<boolean>, label?: DefLabel, name?: string): ValidationRuleObject {
  return {
    skip: SKIP_PROTO,
    name: name ?? 'custom-object-rule',
    _skip: false,
    validate: value => rule(value),
    label: (value) => {
      if (isNil(label))
        return DEFAULT_LABEL

      if (typeof label === 'string')
        return label
      return label(value)
    },
  }
}

/**
 * This method produces rules which require parameter object. This allows user to
 * create more complex rules
 */

type DefParamLabel<P = undefined> = string | ((value: any, params: P) => string)
type RuleParams = Record<string, any>

function $defParam<P = RuleParams>(rule: (value: any, params: P) => boolean | Promise<boolean>, label?: DefParamLabel<P>, name?: string) {
  const validator = (params: P): ValidationRule => ({
    // the value from validate is the actual value we are testing against
    // injected during validation
    _skip: false,
    name: name ?? 'custom-param-rule',
    validate: value => rule(value, params),
    label: (value) => {
      if (isNil(label))
        return DEFAULT_LABEL

      if (typeof label === 'string')
        return label
        // ...args are the parameters user inputs when creating the rule
      return label(value, params)
    },
  })

  // validator.skip = SKIP_PROTO

  return validator
}

export {
  $def,
  $defParam,
}

////////////////
type ValidationReturn = boolean | Promise<boolean>

type PrepareRule<P> = P extends (value: any) => ValidationReturn
  ? (value: any) => ValidationReturn
  : (value: any, params: P) => ValidationReturn

type PrepareLabel<P> = P extends (value: any) => ValidationReturn
  ? (value: any) => string
  : (value: any, params: P) => string

type PrepareReturn<P> = P extends (value: any) => ValidationReturn
  ? ValidationRuleObject
  : ValidationRule

function $<P = undefined>(rule: PrepareRule<P>, label?: string | PrepareLabel<P>, name?: string): PrepareReturn<P> {
  if (rule.length > 1) {
    // return validator FN
    return (params: P) => {
      return {
        _skip: false,
        name: name ?? 'custom-with-params',
        skip: SKIP_PROTO,
        validate: (value: any) => rule(value, params),
        label: (value) => {
          if (isNil(label))
            return DEFAULT_LABEL
          if (typeof label === 'string')
            return label
          return label(value, params)
        },
      } as ValidationRule
    }
  }
  else {
    return {
      _skip: false,
      name: name ?? 'custom-object',
      skip: SKIP_PROTO,
      validate: rule,
      label: (value) => {
        if (isNil(label))
          return DEFAULT_LABEL
        if (typeof label === 'string')
          return label
        return label(value)
      },
    } as ValidationRuleObject
  }
}

interface MyRule {
  test: number

}

const myRule = $<MyRule>((value, param) => param.test > value)
const myRuleVaidator = myRule(10)

// const validatr3 = $({
//   name: 'test',
//   validator: (value, param) => value >= param,
//   label: "Idk bro"
// })

// // Returns object validator = has no params
// const validator = $((value) => !!value)

// // Returns function, which is going to require 1 param (minLen: number)
// const validator2 = $((value, minLen) => value >= minLen)
