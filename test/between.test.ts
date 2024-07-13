import { describe, expect, it } from 'vitest'
import { computed, reactive } from 'vue-demi'
import { useValidation } from '../src/core/validate'
import { between } from '../src/validators/between'

const form = reactive({ num: 10, bad: 20, worst: null })
const form2 = reactive({
  date1: new Date('10/10/2020'),
  date2: new Date('10/10/2020').getTime(),
})

describe('[Validators] between', () => {
  it('using numbers', () => {
    const rules = computed(() => ({
      num: {
        range: between(5, 15),
      },
      bad: {
        range: between(0, 15),
      },
      worst: {
        range: between(0, 10),
      },
    }))

    const { validate } = useValidation(form, rules)

    validate().catch((e) => {
      expect(e.num.invalid).toBeFalsy()
      expect(e.bad.invalid).toBeTruthy()
      expect(e.worst.invalid).toBeTruthy()
    })
  })

  it('using Date', () => {
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
      console.log(e)
      expect(e.date1.invalid).toBeFalsy()
      expect(e.date2.invalid).toBeTruthy()
    })
  })
})
