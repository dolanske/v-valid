import { expect, it } from 'vitest'
import { contains } from '../src'

it('[Validators] Contains', () => {
  expect(contains('Hello').validate('Hello world')).toBeTruthy()
  expect(contains('Hell').validate('Hello world')).toBeTruthy()
  expect(contains('rld').validate('Hello world')).toBeTruthy()
  expect(contains(['world', 'Hello']).validate('Hello world')).toBeTruthy()

  expect(contains(['Hello']).validate(null)).toBeFalsy()
})
