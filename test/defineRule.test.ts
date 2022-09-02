import { isArray } from "lodash"
import { test, expect, describe } from "vitest"
import { computed, reactive } from "vue-demi"
import { defineRule, useValidation } from "../index"

// TODO: Test rules with no parameters

test("[helpers] defineUrl", () => {
  const customRule = defineRule(
    ({}, length) => `Array with at least ${length} length`,
    (value, length) => {
      return isArray(value) && value.length >= length
    }
  )

  const form = reactive({ one: [], two: [1, 2, 3] })
  const rules = computed(() => ({
    one: {
      custom: customRule(1)
    },
    two: {
      custom: customRule(2)
    }
  }))

  const { validate } = useValidation(form, rules)

  validate().catch((e) => {
    // expect(e.one.errors.size).toBe(1)
    console.log(e)
  })
})
