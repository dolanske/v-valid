import { expect, it } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { $validateIfNot, minLength, type, useValidation } from '../src'

it('[Helpers] validateIfNot', () => {
  const form = reactive({
    first: 'Hello world',
    second: [1, 2, 3, 4],
  })

  const rules = computed(() => ({
    first: {
      shouldValidate: $validateIfNot(false, type.num),
    },
    second: {
      shouldNotValidate: $validateIfNot(
        () => typeof form.first === 'number',
        minLength(2),
      ),
    },
  }))

  const { validate } = useValidation(form, rules)

  validate()
    .then((e) => {
      expect(e.second.invalid).toBeFalsy()
    })
    .catch((e) => {
      expect(e.first.invalid).toBeTruthy()
    })
})
