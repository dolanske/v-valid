import { describe, expect, it } from 'vitest'
import { reactive, ref } from 'vue'
import { and, between, createRule, minLength, required, useValidation, withLabel } from '../../src'

describe('[helpers] withLabel', () => {
  const form = reactive({ field: [1, 2] })

  it('replaces the message with a string', async () => {
    const { validate, errors } = useValidation(form, {
      field: { minLength: withLabel('Hello world', minLength(3)) },
    })

    await validate()
    expect(errors.value.field.errors.minLength).toBe('Hello world')
  })

  it('passes the value and live params to a callback', async () => {
    const min = ref(3)
    const { validate, errors } = useValidation(form, {
      field: { minLength: withLabel((value, { min }) => `${value.length} is less than ${min}`, minLength(min)) },
    })

    await validate()
    expect(errors.value.field.errors.minLength).toBe('2 is less than 3')

    min.value = 10
    await validate()
    expect(errors.value.field.errors.minLength).toBe('2 is less than 10')
  })

  it('works with multiple params', () => {
    const rule = withLabel((value, { min, max }) => `${value} not in ${min}-${max}`, between(5, 10))
    expect(rule.label(1, rule.params?.())).toBe('1 not in 5-10')
  })

  it('overrides messages returned by the wrapped rule', async () => {
    const inner = createRule(() => 'inner message')
    const { validate, errors } = useValidation(reactive({ a: '' }), {
      a: { inner: withLabel('outer message', inner), all: withLabel('outer and', and(required)) },
    })

    await validate()
    expect(errors.value.a.errors.inner).toBe('outer message')
    expect(errors.value.a.errors.all).toBe('outer and')
  })

  it('preserves the skipped flag', () => {
    expect(withLabel('x', required.skip()).skipped).toBe(true)
  })
})
