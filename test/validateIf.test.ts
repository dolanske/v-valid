import { test, expect } from "vitest"
import { validateIf, minLength, useValidation, maxLength } from "../index"
import { computed, reactive, ref } from "vue-demi"
import { isArray } from "lodash"

// Prepare testing form
const form = reactive({ field: [1, 2] })

const testRef = ref(true)

test("[Helpers] validateIf", () => {
  const rules = computed(() => ({
    field: {
      // If condition is met (in this example it is); the condition should
      // normally apply. There fore we expect the array to have length of at
      // least 5
      minLength: validateIf(true, minLength(5)),

      // We can also provide a callback which must return a boolean. In this
      // case we're check if the field is an array and then applying a validator
      // for its length
      maxLength: validateIf(() => isArray(form.field), maxLength(1))
    }
  }))

  const { validate, state } = useValidation(form, rules)

  validate("minLength").catch((e) => {
    // For simplicity, we just check if the errors for field is length 1, which
    // if the condition failed, should indeed be 1
    expect(e.field.errors.minLength).toBeTruthy()
    // expect(e.field.errors.maxLength).toBeTruthy()
    expect(e.field.errors.maxLength).toBeFalsy()
  })
})
