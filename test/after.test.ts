import { expect, it } from 'vitest'
import { after } from '../src/validators/after'

it('[validators] after', () => {
  expect(after(new Date('10/10/2021')).validate(50)).toBeFalsy()
  expect(after(new Date('10/10/2010')).validate(new Date('05/05/2010'))).toBeFalsy()
  expect(after(new Date('05/05/2010')).validate(new Date('10/10/2010'))).toBeTruthy()
})
