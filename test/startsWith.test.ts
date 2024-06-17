import { expect, it } from 'vitest'
import { startsWith } from '../src/validators/string/startswith'

it('input starts at a value', () => {
  expect(startsWith('Hello').validate('Hello World')).toBeTruthy()
  expect(startsWith('World', 6).validate('Hello World')).toBeTruthy()

  expect(startsWith('Hello').validate('World Hello')).toBeFalsy()
  // @ts-expect-error No value provided
  expect(startsWith().validate('World Hello')).toBeFalsy()
  // @ts-expect-error Wrong type
  expect(startsWith(25).validate('World Hello')).toBeFalsy()
  expect(startsWith('Hello').label(100)).toBe('Value must be a string and start with \'Hello\'')
  expect(startsWith('Hello').label('World')).toBe('Value must start with \'Hello\'')
})
