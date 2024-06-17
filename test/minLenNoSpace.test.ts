import { expect, it } from 'vitest'
import { minLenNoSpace } from '../src/validators/string/minLenNoSpace'

it('[Validators] MinLenNoSpace', () => {
  expect(minLenNoSpace(5).validate('H e l o')).toBeFalsy()
  expect(minLenNoSpace(5).validate('H e l l o o')).toBeTruthy()
})
