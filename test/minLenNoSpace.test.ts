import { expect, test } from 'vitest'
import { minLenNoSpace } from '../src/validators/string/minLenNoSpace'

test('[Validators] MinLenNoSpace', () => {
  expect(minLenNoSpace(5).validate('H e l o')).toBeFalsy()
  expect(minLenNoSpace(5).validate('H e l l o o')).toBeTruthy()
})
