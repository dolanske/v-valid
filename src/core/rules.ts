import type { ComputedRef } from 'vue-demi'
import { computed, reactive } from 'vue-demi'
import { isArray } from 'lodash-es'
import type { ValidationRule, ValidationRuleObject } from '../types'
import { maxLength } from '../validators/maxLength'
import { useValidation } from './validate'

type Accepted = ValidationRule | ValidationRuleObject
type AcceptedRule = Accepted[] | Record<string, Accepted>

// type DeepReplace<T, M> = {
//   [P in keyof T]:
//   T[P] extends object
//     ? DeepReplace<T[P], M>
//     : AcceptedRule
// }

// TODO:
// Deep autocomplete when creating rules

type DeepPartial<T> = T extends keyof T ? {
  [P in keyof T]: DeepPartial<T[P]>
} : { [P in keyof T]: AcceptedRule }

export function defineRules<F>(form: F, rules: DeepPartial<F>) {
  const formattedRules = !isArray(rules)
    ? rules
    : rules.reduce((group, item, index) => {
      if (group[item.name]) {
        Reflect.set(group, item.name + index, item)
      }
      else {
        Reflect.set(group, item.name, item)
      }
      return group
    }, {})

  return computed(() => formattedRules)
}

// Test
const form = reactive({
  name: '',
  age: 0,
  properties: {
    gender: '',
  },
})

// TODO
// Support array declaration. This will only be available through defineRules. And its output will still just be object based

// TODO
// Errors autocomplete must be deep to mimic form

const rules = defineRules(form, {
  properties: {
    gender: {
      max: maxLength(10),
    },
  },
  name: {
    max: maxLength(10),
  },
})

//
const { errors } = useValidation(form, rules)

console.log(errors)

// const rules = defineRules<typeof form>({
//   'age': {
//     required
//   },
//   properties: {
//     ''
//   }
// })
