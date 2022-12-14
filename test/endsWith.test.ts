import { expect, test } from 'vitest'
import { endsWith } from '../src/validators/string/endsWith'

test('Input starts at a value', () => {
  expect(endsWith('World').validate('Hello World')).toBeTruthy()
  expect(endsWith('Hello', 5).validate('Hello World')).toBeTruthy()

  expect(endsWith('World').validate('World Hello')).toBeFalsy()
  // @ts-expect-error No value provided
  expect(endsWith().validate('World Hello')).toBeFalsy()
  // @ts-expect-error Wrong type
  expect(endsWith(25).validate('World Hello')).toBeFalsy()
  expect(endsWith('Hello').label(100)).toBe('Value must be a string')
  expect(endsWith('Hello').label('World')).toBe('Value must end with \'Hello\'')
})
