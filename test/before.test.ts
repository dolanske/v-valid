import { expect, it } from 'vitest'
import { before } from '../src'

it('[validators] before', () => {
  expect(before(new Date('10/10/2010')).validate(5)).toBeFalsy()
  expect(before(new Date('10/10/2010')).validate(new Date('05/05/2010'))).toBeTruthy()
  expect(before(new Date('05/05/2010')).validate(new Date('10/10/2010'))).toBeFalsy()
})
