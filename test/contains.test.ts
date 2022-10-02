import { expect, test } from 'vitest'
import { contains } from '..'

test('[Validators] Contains', () => {
  expect(contains('Hello').validate('Hello world')).toBeTruthy()
  expect(contains('Hell').validate('Hello world')).toBeTruthy()
  expect(contains('rld').validate('Hello world')).toBeTruthy()
  expect(contains(['world', 'Hello']).validate('Hello world')).toBeTruthy()

  expect(contains(['Hello']).validate(null)).toBeFalsy()
})
