import { expect, it } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { between, email, or, useValidation } from '../src'

const form = reactive({
  first: 'blumf@gmail.com',
  second: 50,
  third: 1,
})

const check = {
  all: or(email, between(10, 100)),
}

it('[Helpers] or', () => {
  const rules = computed(() => ({
    first: { ...check },
    second: { ...check },
    third: { ...check },
  }))

  const { validate, errors } = useValidation(form, rules)

  validate().catch(() => {
    // At least one of the checks passed
    expect(errors.value.first.invalid).toBeFalsy() // Is email
    expect(errors.value.second.invalid).toBeFalsy() // Is within the range

    // None passed
    expect(errors.value.third.invalid).toBeTruthy()
  })
})
