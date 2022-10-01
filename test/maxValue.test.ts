import { expect, test } from 'vitest'
import { maxValue } from '../index'

test('[validators] maxValue', () => {
  expect(maxValue(10).validate(5)).toBeTruthy()
  expect(maxValue(new Date('10/10/2010')).validate(new Date('05/05/2010'))).toBeTruthy()

  expect(maxValue(5).validate(10)).toBeFalsy()
  expect(maxValue(new Date('05/05/2010')).validate(new Date('10/10/2010'))).toBeFalsy()
})
