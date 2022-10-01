import { expect, test } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { between, or, type, useValidation } from '../index'

const form = reactive({
  first: 10,
  second: 200,
  third: 'NONE OF THESE',
})

const check = {
  all: or(type.num, between(2, 100)),
}

test('[Helpers] or', () => {
  const rules = computed(() => ({
    first: { ...check },
    second: { ...check },
    third: { ...check },
  }))

  const { validate } = useValidation(form, rules)

  validate().catch((e) => {
    // At least one of the checks passed
    expect(e.first.invalid).toBeFalsy() // Is within range && number
    expect(e.second.invalid).toBeFalsy() // is number

    // None passed
    expect(e.third.invalid).toBeTruthy() // Is not number and not in range
  })
})
