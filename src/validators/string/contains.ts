import type { MaybeRefOrGetter } from '../../types'
import { defineRule, skippableFactory } from '../../core/rule'
import { isString, toValue } from '../../utils'

/**
 * @rule Value must be a string containing every given word (case insensitive)
 * @param words A word, a whitespace separated list of words, or an array of words
 * @param exact Treat a string with spaces as a single phrase instead of splitting it into words
 */
export const contains = skippableFactory((words: MaybeRefOrGetter<string | string[]>, exact = false) => defineRule({
  name: 'contains',
  params: () => {
    const resolved = toValue(words)
    const list = isString(resolved)
      ? (exact ? [resolved] : resolved.trim().split(/\s+/))
      : resolved
    return { words: list.map(word => word.toLowerCase()) }
  },
  validate: (value, { words }) => {
    if (!isString(value))
      return false
    const haystack = value.toLowerCase()
    return words.every(word => haystack.includes(word))
  },
  label: (value, { words }) => isString(value)
    ? `Value must contain <${words.join(', ')}>`
    : 'Value must be a string',
}))
