import { isArray } from "lodash"
import { test, expect, describe } from "vitest"
import { computed, reactive } from "vue-demi"
import { defineRule, useValidation } from "../index"

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

describe("[helpers] defineUrl", () => {
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
})
