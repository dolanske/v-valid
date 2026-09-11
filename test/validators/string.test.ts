import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { contains, email, endsWith, match, noSpecialChars, startsWith, url } from '../../src'

describe('[validators] email', () => {
  const valid = [
    'email@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@example.name',
    'email@example.museum',
    '_______@example.com',
    'email@example-one.com',
    'email@example.co.jp',
    'email@123.123.123.123',
    '1234567890@example.com',
    'firstname-lastname@example.com',
    'email@example.web',
    'email@111.222.333.44444',
  ]

  const invalid = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@example..com',
    'Abc..123@example.com',
    '”(),:;<>[]@example.com',
    'just”not”right@example.com',
    'this is"really"notallowed@example.com',
  ]

  it('valid emails', () => {
    for (const str of valid)
      expect(email.validate(str), str).toBe(true)
  })

  it('invalid emails', () => {
    for (const str of invalid)
      expect(email.validate(str), str).toBe(false)
    expect(email.validate(null)).toBe(false)
    expect(email.validate(123)).toBe(false)
  })
})

describe('[validators] url', () => {
  it('validates absolute urls', () => {
    expect(url.validate('https://example.com')).toBe(true)
    expect(url.validate('http://localhost:3000/path?q=1#hash')).toBe(true)
    expect(url.validate('ftp://files.example.com')).toBe(true)

    expect(url.validate('example.com')).toBe(false)
    expect(url.validate('/relative/path')).toBe(false)
    expect(url.validate('')).toBe(false)
    expect(url.validate(null)).toBe(false)
    expect(url.validate(42)).toBe(false)
  })
})

describe('[validators] match', () => {
  it('accepts a RegExp or a pattern string', () => {
    expect(match(/^[a-z]+$/).validate('hello')).toBe(true)
    expect(match(/^[a-z]+$/).validate('Hello')).toBe(false)
    expect(match('^\\d+$').validate('123')).toBe(true)
    expect(match('^\\d+$').validate('12a')).toBe(false)
    expect(match(/x/).validate(null)).toBe(false)
  })

  it('is consistent with global expressions', () => {
    const rule = match(/a/g)
    expect(rule.validate('a')).toBe(true)
    expect(rule.validate('a')).toBe(true)
  })

  it('accepts refs', () => {
    const regex = ref(/^a/)
    const rule = match(regex)
    expect(rule.validate('abc')).toBe(true)
    regex.value = /^b/
    expect(rule.validate('abc')).toBe(false)
  })
})

describe('[validators] noSpecialChars', () => {
  it('passes letters and digits only', () => {
    expect(noSpecialChars.validate('Hello123')).toBe(true)
    expect(noSpecialChars.validate('Hello World')).toBe(false)
    expect(noSpecialChars.validate('Hello!')).toBe(false)
    expect(noSpecialChars.validate('')).toBe(true)
    expect(noSpecialChars.validate(123)).toBe(false)
  })

  it('labels', () => {
    expect(noSpecialChars.label('a!', undefined)).toBe('Value must not contain special characters')
    expect(noSpecialChars.label(1, undefined)).toBe('Value must be a string')
  })
})

describe('[validators] contains', () => {
  it('matches words case insensitively', () => {
    expect(contains('Hello').validate('Hello world')).toBe(true)
    expect(contains('hell').validate('Hello world')).toBe(true)
    expect(contains('rld').validate('Hello world')).toBe(true)
    expect(contains(['world', 'Hello']).validate('Hello world')).toBe(true)
    expect(contains(['Hello']).validate(null)).toBe(false)
    expect(contains('missing').validate('Hello world')).toBe(false)
  })

  it('splits by whitespace unless exact', () => {
    expect(contains('Hello Dear World').validate('Hello World')).toBe(false)
    expect(contains('Hello World').validate('Hello Dear World')).toBe(true)
    expect(contains('Hello World', true).validate('Hello Dear World')).toBe(false)
  })

  it('stays reactive and labels', () => {
    const words = ref(['a'])
    const rule = contains(words)
    expect(rule.validate('a')).toBe(true)
    words.value = ['b']
    expect(rule.validate('a')).toBe(false)
    expect(rule.label('a', rule.params?.())).toBe('Value must contain <b>')
    expect(rule.label(1, rule.params?.())).toBe('Value must be a string')
  })
})

describe('[validators] startsWith / endsWith', () => {
  it('startsWith', () => {
    expect(startsWith('Hello').validate('Hello World')).toBe(true)
    expect(startsWith('llo', 2).validate('Hello World')).toBe(true)
    expect(startsWith('World').validate('Hello World')).toBe(false)
    expect(startsWith('x').validate(null)).toBe(false)
    expect(startsWith('x').validate(1)).toBe(false)
  })

  it('endsWith', () => {
    expect(endsWith('World').validate('Hello World')).toBe(true)
    expect(endsWith('Hello', 5).validate('Hello World')).toBe(true)
    expect(endsWith('Hello').validate('Hello World')).toBe(false)
    expect(endsWith('x').validate(undefined)).toBe(false)
  })

  it('stays reactive', () => {
    const search = ref('a')
    const starts = startsWith(search)
    const ends = endsWith(search)
    expect(starts.validate('ab')).toBe(true)
    expect(ends.validate('ba')).toBe(true)
    search.value = 'c'
    expect(starts.validate('ab')).toBe(false)
    expect(ends.validate('ba')).toBe(false)
    expect(starts.label('ab', starts.params())).toBe('Value must start with \'c\'')
  })

  it('labels', () => {
    const starts = startsWith('a')
    const ends = endsWith('a')
    expect(starts.label(1, starts.params())).toBe('Value must be a string')
    expect(ends.label('b', ends.params())).toBe('Value must end with \'a\'')
    expect(ends.label(1, ends.params())).toBe('Value must be a string')
  })
})
