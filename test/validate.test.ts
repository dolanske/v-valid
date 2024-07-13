import { describe, expect, it } from 'vitest'
import { computed, nextTick, reactive, ref } from 'vue-demi'
import { type } from '../src/validators/type'
import { minLength } from '../src/validators/minLength'
import { maxLength } from '../src/validators/maxLength'
import { useValidation } from '../src/core/validate'

describe('[Core] Main validation method', () => {
  it('simple Test', async () => {
    const form = reactive({ identifier: 10 })
    const rules = {
      identifier: {
        number: type.num,
        minLength: minLength(15),
      },
    }

    const { validate, anyError } = useValidation(form, rules)
    validate()
      .catch((e) => {
        expect(anyError.value).toBeTruthy()
        expect(e.identifier.invalid).toBeTruthy()
      })
  })

  it('test Deep Nesting', async () => {
    const form = reactive({
      first: 10,
      nested: {
        foo: 'Hello',
        bar: [1, 2, 3, 4, 5],
      },
      doesNotNeedRules: 10,
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
      validate,
      anyError,
    } = useValidation(form, rules)

    await validate()
      .catch((e) => {
        console.log(e)
        expect(anyError.value).toBeTruthy()
        expect(e.nested.foo.errors.minLength).toBe('Value must be greater or equal to 6')
      })

    // await run()
    //   .catch((e) => {
    //     expect($.anyError).toBeTruthy()
    //     expect(e.nested.foo.errors.minLength).toBe('Value must be greater or equal to 6')
    //   })
  })

  it('change rule parameters after defining useValidation', async () => {
    const form = reactive({ a: 5 })
    const amount = ref(3)
    const rules = computed(() => ({
      a: {
        minLength: minLength(amount),
      },
    }))

    const { validate, anyError } = useValidation(form, rules)

    amount.value = 10

    validate()
      .catch((e) => {
        expect(e.a.errors.minLength).toBe(`Value must be greater or equal to ${amount.value}`)
        expect(anyError.value).toBeTruthy()
      })
  })

  it('try and catch cause', async () => {
    const { validate } = useValidation(reactive({
      value: 5,
    }), {
      value: {
        minLength: minLength(10),
      },
    })

    try {
      await validate()
    }
    catch (errors: any) {
      expect(errors.value.invalid).toBeTruthy()
    }
  })

  // it('manually add an error', async () => {
  //   const { validate, errors, addError } = useValidation(reactive({
  //     first: 5,
  //     second: 10,
  //   }), {
  //     first: {
  //       minLength: minLength(10),
  //     },
  //     second: {
  //       required,
  //     },
  //   })

  //   await validate()
  //     .catch(() => {
  //       expect(errors.first.invalid).toBeTruthy()
  //     })

  //   const _errorKey = 'shouldFail'
  //   const _errorMessage = 'This is a test error'

  //   addError('second', {
  //     key: _errorKey,
  //     message: _errorMessage,
  //   })

  //   expect(errors.second.invalid).toBeTruthy()
  //   expect(errors.second.errors[_errorKey]).toBe(_errorMessage)
  // })

  it('submitting multiple times without change', async () => {
    const { validate, errors } = useValidation(reactive({
      first: 5,
    }), {
      first: { minLength: minLength(1) },
    })

    const snaph = `
    {
      "first": {
        "errors": {
          "minLength": "Value must be greater or equal to 1",
        },
        "id": "first",
        "invalid": true,
        "value": 5,
      },
    }
    `

    await validate().catch(() => { })
    expect(errors.value).toMatchInlineSnapshot(snaph)
    await nextTick()
    await validate().catch(() => { })
    expect(errors.value).toMatchInlineSnapshot(snaph)
  })
})
