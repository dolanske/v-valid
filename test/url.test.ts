import { describe, expect, it } from 'vitest'
import { url } from '../src'

const valid = [
  'https://www.google.com',
  'http://127.0.0.1:8080',
  'https://www.url-with-querystring.com/?url=has-querystring',
  'http://www.google.com',
  'mailto:somebody@google.com',
  'mailto://aph@apirateh.at',
]

const invalid = [
  'cumcumcumc/cum',
  '1',
  'chantar;chantaro//chantaro@chantaro',
  ';./;.\';.\';.\'',
]

describe('[validators] Url', () => {
  it('valid URLS', () => {
    for (const item of valid)
      expect(url.validate(item)).toBeTruthy()
  })

  it('invalid URLS', () => {
    for (const item of invalid)
      expect(url.validate(item)).toBeFalsy()
  })
})
