import { expect, it } from 'vitest'
import { endsWith } from '../src/validators/string/endsWith'

it('input starts at a value', () => {
  expect(endsWith('World').validate('Hello World')).toBeTruthy()
  expect(endsWith('Hello', 5).validate('Hello World')).toBeTruthy()

  expect(endsWith('World').validate('World Hello')).toBeFalsy()
  // @ts-expect-error No value provided
  expect(endsWith().validate('World Hello')).toBeFalsy()
  // @ts-expect-error Wrong type
  expect(endsWith(25).validate('World Hello')).toBeFalsy()
  expect(endsWith('Hello').label(100)).toBe('Value must be a string and end with \'Hello\'')
  expect(endsWith('Hello').label('World')).toBe('Value must end with \'Hello\'')
})
