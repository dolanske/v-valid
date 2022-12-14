import { expect, test } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { $and, between, type, useValidation } from '../src/index'

const form = reactive({
  first: 10,
  second: 200,
})

const check = {
  all: $and(type.num, between(2, 100)),
}

test('[Helpers] and', () => {
  const rules = computed(() => ({
    first: { ...check },
    second: { ...check },
  }))

  const { validate } = useValidation(form, rules)

  validate().catch((e) => {
    expect(e.first.invalid).toBeFalsy()
    expect(e.second.invalid).toBeTruthy()
  })
})
