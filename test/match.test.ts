import { expect, it } from 'vitest'
import { match } from '../src'

it('[validators] Match', () => {
  expect(match(/hello/g).validate('hello world')).toBeTruthy()
  expect(match(/^notthere$/g).validate('hello world')).toBeFalsy()
})
