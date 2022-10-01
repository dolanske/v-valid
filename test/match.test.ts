import { expect, test } from 'vitest'
import { match } from '../index'

test('[validators] Match', () => {
  expect(match(/hello/g).validate('hello world')).toBeTruthy()
  expect(match(/^notthere$/g).validate('hello world')).toBeFalsy()
})
