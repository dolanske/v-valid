import { describe, expect, test } from 'vitest'
import { computed, reactive, ref } from 'vue-demi'
import { type } from '../src/validators/type'
import { minLength } from '../src/validators/minLength'
import { maxLength } from '../src/validators/maxLength'
import { useValidation } from '../src/core/validate'

describe('[Core] Main validation method', () => {
  test('Simple Test', async () => {
    const form = reactive({ identifier: 10 })
    const rules = {
      identifier: {
        number: type.num,
        minLength: minLength(15),
      },
    }

    const { validate, root } = useValidation(form, rules)
    validate()
      .catch((e) => {
        expect(root.anyError).toBeTruthy()
        expect(e.identifier.invalid).toBeTruthy()
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

    const rules = {
      first: { mustBeANum: type.num },
      nested: {
        foo: { minLength: minLength(6) },
        bar: {
          mustBeAnArray: type.arr,
          maxLength: maxLength(3),
        },
      },
    }

    const {
      run, root,
    } = useValidation(form, rules)

    run()
      .catch((e) => {
        expect(root.anyError).toBeTruthy()
        expect(e.nested.foo.errors.minLength).toBe('Value must be greater or equal to 6')
      })
  })

  test('Change rule parameters after defining useValidation', async () => {
    const form = reactive({ a: 5 })
    const amount = ref(3)
    const rules = computed(() => ({
      a: {
        minLength: minLength(amount),
      },
    }))

    const { run, root } = useValidation(form, rules)

    amount.value = 10

    run()
      .catch((e) => {
        expect(e.a.errors.minLength).toBe(`Value must be greater or equal to ${amount.value}`)
        expect(root.anyError).toBeTruthy()
      })
  })

  test('Try and catch cause', async () => {
    const { run } = useValidation(reactive({
      value: 5,
    }), {
      value: {
        minLength: minLength(10),
      },
    })

    try {
      await run()
    }
    catch (errors: any) {
      expect(errors.value.invalid).toBeTruthy()
    }
  })
})
