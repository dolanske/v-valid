import type { MaybePromise, ValidationRule } from '../types'
import { defineRule, runRule, skippableFactory } from '../core/rule'
import { chain } from '../utils'

/**
 * @rule Value must fail every provided rule. Rules run in order and stop at
 * the first pass.
 * @param rules Validation rules
 */
export const not = skippableFactory((...rules: ValidationRule[]) => defineRule({
  name: 'not',
  validate: (value) => {
    const step = (index: number): MaybePromise<boolean> => {
      if (index >= rules.length)
        return true
      return chain(runRule(rules[index], value), result => result === true ? false : step(index + 1))
    }
    return step(0)
  },
  label: 'Value must pass none of the checks',
}))
