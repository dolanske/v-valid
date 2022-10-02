import { expect, test } from 'vitest'
import { maxLenNoSpace } from '../src/validators/string/maxLenNoSpace'

test('[Validators] MaxLenNoSpace', () => {
  expect(maxLenNoSpace(5).validate('H e l o')).toBeTruthy()
  expect(maxLenNoSpace(5).validate('H e l l o o')).toBeFalsy()
})
