import { describe, expect, it } from 'vitest'
import { reactive, ref } from 'vue'
import { after, before, between, decimal, sameAs, useValidation } from '../../src'

describe('[validators] between', () => {
  it('validates numbers', async () => {
    const form = reactive({ num: 10, bad: 20, worst: null })
    const { validate, errors } = useValidation(form, {
      num: { range: between(5, 15) },
      bad: { range: between(0, 15) },
      worst: { range: between(0, 10) },
    })

    expect(await validate()).toBe(false)
    expect(errors.value.num.invalid).toBe(false)
    expect(errors.value.bad.invalid).toBe(true)
    expect(errors.value.bad.errors.range).toBe('Value must be between 0 and 15')
    expect(errors.value.worst.invalid).toBe(true)
  })

  it('validates dates, mixing Date objects and timestamps', () => {
    expect(between(new Date('2020-10-05'), new Date('2020-10-15')).validate(new Date('2020-10-10'))).toBe(true)
    expect(between(new Date('2020-12-05').getTime(), new Date('2020-12-15')).validate(new Date('2020-10-10'))).toBe(false)
    expect(between(0, 1e13).validate(new Date('2020-10-10'))).toBe(true)
    expect(between(0, 10).validate('5')).toBe(false)
  })

  it('stays reactive', () => {
    const max = ref(10)
    const rule = between(0, max)
    expect(rule.validate(5)).toBe(true)
    max.value = 3
    expect(rule.validate(5)).toBe(false)
  })
})

describe('[validators] before / after', () => {
  const limit = new Date('2020-01-01')

  it('before is inclusive and accepts dates, timestamps and strings', () => {
    expect(before(limit).validate(new Date('2019-06-01'))).toBe(true)
    expect(before(limit).validate(new Date('2020-01-01'))).toBe(true)
    expect(before(limit).validate(new Date('2020-06-01'))).toBe(false)
    expect(before(limit).validate('2019-06-01')).toBe(true)
    expect(before(limit).validate(new Date('2019-06-01').getTime())).toBe(true)
    expect(before(limit).validate(null)).toBe(false)
    expect(before(limit).validate('not a date')).toBe(false)
    expect(before('2020-01-01').validate(new Date('2019-06-01'))).toBe(true)
  })

  it('after is inclusive', () => {
    expect(after(limit).validate(new Date('2020-06-01'))).toBe(true)
    expect(after(limit).validate(new Date('2020-01-01'))).toBe(true)
    expect(after(limit).validate(new Date('2019-06-01'))).toBe(false)
    expect(after(limit).validate(undefined)).toBe(false)
  })

  it('stays reactive', () => {
    const max = ref(new Date('2020-01-01'))
    const rule = before(max)
    expect(rule.validate(new Date('2019-01-01'))).toBe(true)
    max.value = new Date('2018-01-01')
    expect(rule.validate(new Date('2019-01-01'))).toBe(false)
  })
})

describe('[validators] decimal', () => {
  it('passes only numbers with a fractional part', () => {
    expect(decimal.validate(10)).toBe(false)
    expect(decimal.validate('Hello')).toBe(false)
    expect(decimal.validate('124.4555')).toBe(false)
    expect(decimal.validate(undefined)).toBe(false)
    expect(decimal.validate(Number.NaN)).toBe(false)
    expect(decimal.validate(Number.POSITIVE_INFINITY)).toBe(false)

    expect(decimal.validate(4.0000001)).toBe(true)
    expect(decimal.validate(-0.5)).toBe(true)
  })

  it('labels', () => {
    expect(decimal.label(1, undefined)).toBe('Value must be a decimal number')
  })
})

describe('[validators] sameAs', () => {
  it('compares strictly by default', () => {
    expect(sameAs(1).validate(1)).toBe(true)
    expect(sameAs(1).validate(2)).toBe(false)
    expect(sameAs('1').validate(1)).toBe(false)
    expect(sameAs('hello world').validate('hello world')).toBe(true)
  })

  it('compares loosely when lenient', () => {
    expect(sameAs(1, true).validate('1')).toBe(true)
  })

  it('compares against a live ref or getter', () => {
    const form = reactive({ password: 'a', repeat: 'a' })
    const rule = sameAs(() => form.password)
    expect(rule.validate(form.repeat)).toBe(true)
    form.password = 'b'
    expect(rule.validate(form.repeat)).toBe(false)

    const target = ref('x')
    const refRule = sameAs(target)
    expect(refRule.validate('x')).toBe(true)
    target.value = 'y'
    expect(refRule.validate('x')).toBe(false)
  })
})
