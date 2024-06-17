import { expect, it } from 'vitest'
import { decimal } from '../src/validators/decimal'

it('decimal', () => {
  expect(decimal.validate(10)).toBeFalsy()
  expect(decimal.validate('Hello')).toBeFalsy()
  // @ts-expect-error no input
  expect(decimal.validate()).toBeFalsy()

  expect(decimal.validate(0.0000000000000001)).toBeTruthy()
  expect(decimal.validate('124.4555')).toBeTruthy()
})
