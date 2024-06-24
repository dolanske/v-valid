import { expect, it } from 'vitest'
import { required } from '../src'

it('[validators] Required', () => {
  // Should fail
  expect(required.validate('')).toBeFalsy()
  expect(required.validate({})).toBeFalsy()
  expect(required.validate([])).toBeFalsy()
  expect(required.validate(new Set())).toBeFalsy()
  expect(required.validate(new Map())).toBeFalsy()

  // Should pass
  expect(required.validate('test')).toBeTruthy()
  expect(required.validate(0)).toBeTruthy()
  expect(required.validate({ foo: 'bar' })).toBeTruthy()
  expect(required.validate(['test'])).toBeTruthy()
  expect(required.validate(new Set('test'))).toBeTruthy()
  expect(required.validate(new Map([['foo', 'bar']]))).toBeTruthy()
})
