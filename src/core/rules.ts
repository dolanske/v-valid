import type { ReplacePrimitivesOptional, ValidationRule, ValidationRuleObject } from '../types'
import { isArray, iterateInSync, setDeep } from '../utils'

type Rule = ValidationRule | ValidationRuleObject
type DefineRuleType<T> = ReplacePrimitivesOptional<T, Record<string, Rule> | Array<Rule>>

/**
 * Type safe helper to generating rules from form objects. Also allows array rule definition
 *
 * @param rules
 * @returns Rules to be used within the composable
 */
export function defineRules<F>(rules: DefineRuleType<F>): DefineRuleType<F> {
  iterateInSync(rules, (_, value, path) => {
    if (!isArray(value))
      return

    setDeep(rules, path, value.reduce((group, item, index) => {
      if (item.name in group) {
        Reflect.set(group, item.name + index, item)
      }
      else {
        Reflect.set(group, item.name, item)
      }
      return group
    }, {} as DefineRuleType<F>))
  })

  return rules
}
