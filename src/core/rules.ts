import type { ComputedRef } from 'vue-demi'
import { computed, reactive } from 'vue-demi'
import { isArray } from 'lodash-es'
import type { ValidationRule, ValidationRuleObject } from '../types'
import { maxLength } from '../validators/maxLength'
import { useValidation } from './validate'

type Accepted = ValidationRule | ValidationRuleObject
type AcceptedRule = Accepted[] | Record<string, Accepted>

// TODO:
// Deep autocomplete when creating rules

// I DONT KNOW???
// If R[P]._skip ?

type DeepPartial<F, R> = F extends AcceptedRule
  ? { [P in keyof F]: Record<string, Accepted> }
  : { [P in keyof R]: DeepPartial<R[P], R> }

// type DeepPartial<F, R> = F extends keyof R ? {
//   [P in keyof R]: DeepPartial<R[F], R>
// } : { [P in keyof R]: Record<any, Accepted> }

export function defineRules<F, R>(form: F, rules: DeepPartial<F, R>) {
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
    nested: {
      gender: 0,
    },
  },
})

// TODO
// Support array declaration. This will only be available through defineRules. And its output will still just be object based

// TODO
// Errors autocomplete must be deep to mimic form

const rules = defineRules(form, {
  properties: {
    nested: {
      gender: {
        len: maxLength(5),
      },
    },
  },
  name: {
    test: maxLength(5),
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
