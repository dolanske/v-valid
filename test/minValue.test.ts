import { expect, test } from 'vitest'
import { minValue } from '../src/index'

test('[validators] MinValue', () => {
  expect(minValue(10).validate(5)).toBeFalsy()
  expect(minValue(new Date('10/10/2010')).validate(new Date('05/05/2010'))).toBeFalsy()

  expect(minValue(5).validate(10)).toBeTruthy()
  expect(minValue(new Date('05/05/2010')).validate(new Date('10/10/2010'))).toBeTruthy()
})
