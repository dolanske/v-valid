import { describe, expect, test } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { type } from '../src/validators/type'
import { minLength } from '../src/validators/minLength'
import { maxLength } from '../src/validators/maxLength'
import { useValidation } from '../src/core/validate'

describe('[Core] Main validation method', () => {
  test('Simple Test', async () => {
    const form = reactive({ identifier: 10 })
    const rules = computed(() => ({
      identifier: {
        number: type.num,
        minLength: minLength(15),
      },
    }))

    const { validate, errors, root } = useValidation(form, rules)
    validate()
      .finally(() => {
        expect(root.anyError).toBeTruthy()
        expect(errors.identifier.invalid).toBeTruthy()
      })
  })

  test('Test Deep Nesting', async () => {
    const form = reactive({
      first: 10,
      nested: {
        foo: 'Hello',
        bar: [1, 2, 3, 4, 5],
      },
    })

    const rules = computed(() => ({
      first: { mustBeANum: type.num },
      nested: {
        foo: { minLength: minLength(6) },
        bar: {
          mustBeAnArray: type.arr,
          maxLength: maxLength(3),
        },
      },
    }))

    const {
      run, root,
    } = useValidation(form, rules)

    run()
      .finally(() => {
        expect(root.anyError).toBeTruthy()
        // expect(errors.nested.bar)
      })
  })
})
