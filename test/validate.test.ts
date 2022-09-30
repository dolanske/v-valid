import { expect, test, describe } from "vitest"
import { get, set, cloneDeep, assignWith } from "lodash"
import { parsePath } from "../src/utils"
import { computed, reactive } from "vue-demi"
import { type } from "../src/validators/type"
import { minLength } from "../src/validators/minLength"
import { maxLength } from "../src/validators/maxLength"
import { emptyErrorObject, iterateIn } from "../src/core/validate"
import { Rule, ValidationRule, Errors } from "../src/types"

describe("[Core] Main validation method", () => {
  test("Test deep iteration", async () => {
    const form = reactive({
      first: 10,
      nested: {
        foo: "Hello",
        bar: [1, 2, 3, 4, 5]
      }
    })

    const rules = computed(() => ({
      first: { mustBeANum: type.num },
      nested: {
        foo: { minLength: minLength(6) },
        bar: {
          mustBeAnArray: type.arr,
          maxLength: maxLength(3)
        }
      }
    }))

    // Create errors objects, which is just the form but data replaced with error objects
    const errors = {}
    const root = reactive<{
      anyError: boolean
      pending: boolean
      errors: any
    }>({ anyError: false, pending: false, errors: null })
    const validateOnly: string[] = []

    root.pending = true

    await iterateIn(form, async (key, value, path) => {
      path = parsePath(path)

      // Create an errors object following the structure of the form
      set(errors, path, cloneDeep(emptyErrorObject))

      // Get all rules for an object
      const pathRules: Rule = get(rules.value, path)

      // Iterate over available rules and perform validation
      for (const [ruleKey, ruleData] of Object.entries(pathRules)) {
        if (validateOnly.length > 0 && !validateOnly.includes(ruleKey)) {
          continue
        }

        const { label, validate, _skip }: ValidationRule = ruleData

        if (_skip) continue

        const didPass = await validate(value)

        set(errors, `${path}.id`, key)
        set(errors, `${path}.value`, value)

        if (!didPass) {
          root.anyError = true

          set(errors, `${path}.invalid`, true)
          set(errors, `${path}.errors.${ruleKey}`, label(value))
        }
      }
    })

    root.errors = errors as typeof errors
    root.pending = false
  })
})
