import { describe, expect, it } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { $withLabel, minLength, useValidation } from '../src'

// Prepare testing form
const form = reactive({ field: [1, 2] })

describe('[helpers] withLabel', () => {
  it('test custom message as a callback', () => {
    // Prepare rules
    const rules = computed(() => ({
      field: {
        // use withLabel helper to create custom error message We can either use
        // a string or specify a callback which also exposes some parameters such
        // as type and value (more to come maybe)
        minLength: $withLabel((value) => {
          // This should return '2'
          expect(value).toHaveLength(2)
          return value.length
        }, minLength(3)),
      },
    }))

    // Get the validation trigger method
    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      // Only look for errors
      // Errors are a Set, so first turn it into an array and get the first one
      expect(e.field.errors.minLength).toBe(2)
    })
  })

  it('simple custom message as a string', () => {
    const rules = computed(() => ({
      field: { minLength: $withLabel('Hello world', minLength(3)) },
    }))

    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      expect(e.field.errors.minLength).toBe('Hello world')
    })
  })
})
