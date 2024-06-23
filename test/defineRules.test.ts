import { describe, expect, it } from 'vitest'
import { defineRules } from '../src/core/rules'
import { maxLength, required } from '../src'

const { stringify } = JSON

describe('[Core] Rule definition helper', () => {
  it('should format array rules and conform to nested structure', () => {
    const rules = defineRules<{
      name: string
      nested: {
        deeper: {
          age: number
        }
      }
    }>({
      name: [
        required,
        maxLength(64),
      ],
      nested: {
        deeper: {
          age: {
            required,
          },
        },
      },
    })

    expect(stringify(rules)).toBe(stringify({
      name: {
        required,
        maxLength: maxLength(64),
      },
      nested: {
        deeper: {
          age: {
            required,
          },
        },
      },
    }))
  })
})
