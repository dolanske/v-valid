import { computed, reactive } from 'vue-demi'
import type { ValidationRule, ValidationRuleObject } from '../types'
import { maxLength } from '../validators/maxLength'
import { useValidation } from './validate'

type Accepted = ValidationRule | ValidationRuleObject

export function defineRules<F>(form: F, rules: Partial<Record<keyof F, Accepted>>) {
  return computed(() => rules)
}

// TODO
// Fix deeply nested autocomplete

// Test
const form = reactive({
  name: '',
  age: 0,
  properties: {
    sex: '',
  },
})

// TODO
// Support array declaration

const rules = defineRules(form, {
  age: [required, maxLength(10)],
})

//
const form = useValidation(form, rules)

// const rules = defineRules<typeof form>({
//   'age': {
//     required
//   },
//   properties: {
//     ''
//   }
// })
