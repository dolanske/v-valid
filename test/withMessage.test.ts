import { test, expect, describe } from "vitest"
import { withMessage, minLength, useValidation } from "../index"
import { computed, reactive } from "vue-demi"

// Prepare testing form
const form = reactive({ field: [1, 2] })

describe("[helpers] withMessage", () => {
  test("Test custom message as a callback", () => {
    // Prepare rules
    const rules = computed(() => ({
      field: {
        // use withMessage helper to create custom error message We can either use
        // a string or specify a callback which also exposes some parameters such
        // as type and value (more to come maybe)
        minLength: withMessage((value) => {
          // This should return '2'
          expect(value).toHaveLength(2)
          return value.length
        }, minLength(3))
      }
    }))

    // Get the validation trigger method
    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      // Only look for errors
      // Errors are a Set, so first turn it into an array and get the first one
      const errs = Array.from(e.field.errors)

      expect(errs).toHaveLength(1)
      expect(errs[0]).toBe(2)
    })
  })

  test("Simple custom message as a string", () => {
    const rules = computed(() => ({
      field: { minLenegth: withMessage("Hello world", minLength(3)) }
    }))

    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      expect(Array.from(e.field.errors)[0]).toBe("Hello world")
    })
  })
})
