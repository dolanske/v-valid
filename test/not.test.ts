import { expect, test } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { $not, between, type, useValidation } from '../index'

const form = reactive({
  first: 10,
  second: 'Hello world',
})

test('[Helpers] not', () => {
  const rules = computed(() => ({
    first: {
      notStringAndNotBetween: $not(type.num, between(15, 20)),
    },
    second: {
      notNumber: $not(type.num),
    },
  }))

  const { validate } = useValidation(form, rules)

  validate().catch((e) => {
    // It is invalid because
    expect(e.first.invalid).toBeTruthy()
    expect(e.second.invalid).toBeFalsy()
  })
})
