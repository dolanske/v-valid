import { describe, expect, test } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { useValidation } from '../src/core/validate'
import { between } from '../src/validators/between'

const form = reactive({ num: 10, bad: 20 })
const form2 = reactive({
  date1: new Date('10/10/2020'),
  date2: new Date('10/10/2020').getTime(),
})

describe('[Validators] between', () => {
  test('Using numbers', () => {
    const rules = computed(() => ({
      num: {
        range: between(5, 15),
      },
      bad: {
        range: between(0, 15),
      },
    }))

    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      expect(e.num.invalid).toBeFalsy()
      expect(e.bad.invalid).toBeTruthy()
    })
  })

  test('Using Date', () => {
    const rules = computed(() => ({
      date1: {
        between: between(new Date('10/05/2020'), new Date('10/15/2020')),
      },
      date2: {
        notBetween: between(
          new Date('12/05/2020').getTime(),
          new Date('12/15/2020'),
        ),
      },
    }))

    const { validate } = useValidation(form2, rules)

    validate().catch((e) => {
      expect(e.date1.invalid).toBeFalsy()
      expect(e.date2.invalid).toBeTruthy()
    })
  })
})
