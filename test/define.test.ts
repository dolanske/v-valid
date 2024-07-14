import { describe, expect, it } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { createRule, createRuleArg, useValidation } from '../src'
import { isArray, isNil, isString } from '../src/utils'

// Rules without params
const RULE_required = createRule(value => !isNil(value))
const RULE_requiredMessage = createRule(value => !isNil(value), 'huh?')
const RULE_string = createRule(def => isString(def), value => `Value must be a string. Value is <${typeof value}>`)

// Rules with params
const RULE_arrRange = createRuleArg<{
  min: number
  max: number
}>((value, { min, max }) => isArray(value) && value.length >= min && value.length <= max, (value, { min, max }) => `Value <${value}> must be an array and between ${min} and ${max} in length.`)

const RULE_async = createRule(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(false)
      }, 500)
    }),
)

const RULE_equals = createRuleArg<{ v: string }>((value, { v }) => {
  return value === v
}, 'idk')

describe('[helpers] createRule and createRuleArgs', () => {
  it('no parameters rule', () => {
    const form = reactive({ data: null })
    const rules = {
      data: {
        RULE_required,
        RULE_requiredMessage,
      },
    }
    const { validate } = useValidation(form, rules)

    validate()
      .catch((err) => {
        expect(err.data.invalid).toBeTruthy()
        expect(err.data.errors.RULE_required).toBe('Value does not satisfy the validation rule.')
        expect(err.data.errors.RULE_requiredMessage).toBe('huh?')
      })
  })

  it('rule with custom message', () => {
    const form = reactive({ value: 100 })
    const rules = { value: { RULE_string } }
    const { validate } = useValidation(form, rules)

    validate()
      .catch((err) => {
        expect(err.value.invalid).toBeTruthy()
        expect(err.value.errors.RULE_string).toBe('Value must be a string. Value is <number>')
      })
  })

  it('rule with custom parameters', () => {
    const form = reactive({
      first: [1, 2, 3, 4],
      second: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      third: 'Hello World',
    })
    const rules = {
      first: { range: RULE_arrRange({ min: 5, max: 20 }) },
      second: { range: RULE_arrRange({ min: 5, max: 20 }) },
      third: { equals: RULE_equals({ v: 'not' }) },
    }
    const { validate, errors } = useValidation(form, rules)

    validate()
      .catch((e) => {
        expect(e.first.invalid).toBeTruthy()
        expect(e.third.errors.equals).toBe('idk')
      })
      .finally(() => {
        expect(errors.value.second.invalid).toBeFalsy()
      })
  })

  it('async validation', async () => {
    const form = reactive({ value: 'nothing' })
    const rules = computed(() => ({
      value: { async: RULE_async },

    }))

    const { validate } = useValidation(form, rules)
    const start = performance.now()

    await validate().catch((err) => {
      const end = performance.now()
      // If value is larger than 500, we can safeuly assume the validation was
      // performed asynchronously
      expect(end - start).toBeGreaterThanOrEqual(500)
      expect(err.value.errors.async).toBe('Value does not satisfy the validation rule.')
    })
  })
})
