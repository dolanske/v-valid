import { isArray, isNil } from "lodash"
import { test, expect, describe } from "vitest"
import { computed, reactive } from "vue-demi"
import { defineRule, useValidation, defineRuleObj } from "../index"

const form = reactive({ one: [], two: [1, 2, 3] })

const arrAndMinLen = defineRule(
  (_, length) => `Array with at least ${length} length`,
  (value, length) => {
    return isArray(value) && value.length >= length
  }
)

const arrLenInBetween = defineRule(
  (_, min, max) => `Array length must bet between ${min} and ${max}`,
  (value, min, max) => value.length >= min && value.length <= max
)

const noParamRule = defineRule(
  "Must not be an array",
  (value) => !isArray(value)
)

const asyncRule = defineRule(
  "This rule should take 1s to validate",
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 500)
    })
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
      expect(end - start).toBeGreaterThan(500)
    })
  })
})

const requiredClone = defineRuleObj({
  message: "Value is required",
  rule: (value) => !isNil(value)
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
