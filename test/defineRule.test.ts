import { isArray, isNil } from "lodash"
import { test, expect, describe } from "vitest"
import { computed, reactive } from "vue-demi"
import { defineRule, useValidation, defineRuleObj } from "../index"

const form = reactive({ one: [], two: [1, 2, 3] })

const arrAndMinLen = defineRule(
  (value, length) => {
    return isArray(value) && value.length >= length
  },
  (_, length) => `Array with at least ${length} length`
)

const arrLenInBetween = defineRule(
  (value, min, max) => value.length >= min && value.length <= max,
  (_, min, max) => `Array length must bet between ${min} and ${max}`
)

const noParamRule = defineRule(
  (value) => !isArray(value),
  "Must not be an array"
)

const asyncRule = defineRule(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 500)
    }),
  "This rule should take 0.5s to validate"
)

describe("[helpers] defineRule", () => {
  test("NO args", () => {
    const rules = computed(() => ({
      two: {
        noParamRule: noParamRule()
      }
    }))

    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      expect(e.one.invalid).toBeFalsy()
    })
  })

  test("WITH args", () => {
    const rules = computed(() => ({
      one: {
        arrAndMinLen: arrAndMinLen(1)
      },
      two: {
        arrLenInBetween: arrLenInBetween(1, 3)
      }
    }))

    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      expect(e.one.invalid).toBeTruthy()
      expect(e.two.invalid).toBeFalsy()
    })
  })

  test("ASYNC", async () => {
    const rules = computed(() => ({
      two: {
        asyncRule: asyncRule()
      }
    }))

    const { validate } = useValidation(form, rules)

    const start = Date.now()

    await validate().then((e) => {
      const end = Date.now()
      // If value is larger than 500, we can safeuly assume the validation was
      // performed asynchronously
      expect(end - start).toBeGreaterThanOrEqual(500)
    })
  })
})

const requiredClone = defineRuleObj({
  rule: (value) => !isNil(value),
  label: "The value is required"
})

describe("[helpers] defineRuleObj", () => {
  test("Clone of required", () => {
    const rules = computed(() => ({
      one: { requiredClone },
      two: { requiredClone }
    }))

    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      expect(e.one.invalid).toBeTruthy()
      expect(e.two.invalid).toBeFalsy()
    })
  })
})
