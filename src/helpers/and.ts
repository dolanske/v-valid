import type { MaybePromise, ValidationRule } from '../types'
import { defineRule, runRule, skippableFactory } from '../core/rule'
import { chain } from '../utils'

/**
 * @rule Value must pass every provided rule. Rules run in order and stop at
 * the first failure, whose message is used as the error.
 * @param rules Validation rules
 */
export const and = skippableFactory((...rules: ValidationRule[]) => defineRule({
  name: 'and',
  validate: (value) => {
    const step = (index: number): MaybePromise<true | string> => {
      if (index >= rules.length)
        return true
      return chain(runRule(rules[index], value), result => result === true ? step(index + 1) : result)
    }
    return step(0)
  },
  label: 'Value must pass all the required checks',
}))
