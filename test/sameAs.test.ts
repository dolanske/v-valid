import { expect, it } from 'vitest'
import { sameAs } from '../src'

it('[validators] SameAs', () => {
  // Numbers
  expect(sameAs(1).validate(1)).toBeTruthy()
  expect(sameAs(1).validate(2)).toBeFalsy()

  // Leanient
  expect(sameAs(1, true).validate('1')).toBeTruthy()
  expect(sameAs('1').validate(1)).toBeFalsy()

  expect(sameAs('hello world').validate('hello world')).toBeTruthy()
  expect(sameAs('hello').validate('world')).toBeFalsy()
})
