import { describe, expect, it } from 'vitest'
import { defineRules } from '../src/core/rules'
import { maxLength, required } from '../src'

const { stringify } = JSON

describe('[Core] Rule definition helper', () => {
  it('should format array rules', () => {
    const rules = defineRules<{
      name: string
    }>({
      name: [
        required,
        maxLength(64),
      ],
    })

    expect(stringify(rules)).toBe(stringify({
      name: {
        required,
        maxLength: maxLength(64),
      },
    }))
  })
})
