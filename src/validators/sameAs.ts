import type { MaybeRefOrGetter } from '../types'
import { defineRule, skippableFactory } from '../core/rule'
import { toValue } from '../utils'

/**
 * @rule Value must equal `compared`. Pass a ref or getter to compare against
 * another live form field.
 * @param compared The value to compare against
 * @param lenient Compare with `==` instead of `===`
 *
 * ```ts
 * const rules = {
 *   passwordRepeat: { sameAs: sameAs(() => form.password) },
 * }
 * ```
 */
export const sameAs = skippableFactory((compared: MaybeRefOrGetter<unknown>, lenient = false) => defineRule({
  name: 'sameAs',
  params: () => ({ compared: toValue(compared) }),
  // eslint-disable-next-line eqeqeq
  validate: (value, { compared }) => lenient ? value == compared : value === compared,
  label: 'Values must match',
}))
