import { expect, it } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { between, maxLength, not, useValidation } from '../src'

const form = reactive({
  first: 10,
  second: 'Hello world',
})

it('[Helpers] not', () => {
  const rules = computed(() => ({
    first: {
      notBetween: not(between(15, 20)),
    },
    second: {
      notShortEnough: not(maxLength(5)),
    },
  }))

  const { validate } = useValidation(form, rules)

  validate().catch((e) => {
    // It is invalid because
    expect(e.first.invalid).toBeTruthy()
    expect(e.second.invalid).toBeFalsy()
  })
})
