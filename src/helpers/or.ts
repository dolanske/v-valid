import type { MaybePromise, ValidationRule } from '../types'
import { defineRule, runRule, skippableFactory } from '../core/rule'
import { chain } from '../utils'

/**
 * @rule Value must pass at least one of the provided rules. Rules run in order
 * and stop at the first pass.
 * @param rules Validation rules
 */
export const or = skippableFactory((...rules: ValidationRule[]) => defineRule({
  name: 'or',
  validate: (value) => {
    const step = (index: number): MaybePromise<boolean> => {
      if (index >= rules.length)
        return false
      return chain(runRule(rules[index], value), result => result === true ? true : step(index + 1))
    }
    return step(0)
  },
  label: 'Value must pass at least one of the checks',
}))
