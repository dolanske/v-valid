import type { ValidationRule, ValidationRuleObject } from './types'

/**
 * @internal
 * Sets validation skip to true
 */
export const SKIP_PROTO = function (..._args: any[]): ValidationRule {
  return {
    _skip: true,
    validate: () => true,
    label: () => 'test',
  }
}

/**
 * @internal
 * Validates multiple rules
 */
export const validateEntries = (
  value: any,
  rules: Array<ValidationRule | ValidationRuleObject>,
  mode: 'every' | 'some' | 'none',
): Promise<boolean> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<boolean>(async (resolve) => {
    const results: boolean[] = []

    for (const rule of rules) {
      // If validation function is missing
      if (!rule.validate)
        throw new Error('Rule is missing a validator function')

      const result = await rule.validate(value)
      results.push(result)
    }

    switch (mode) {
      case 'every': {
        resolve(results.every(result => result))
        break
      }
      case 'some': {
        resolve(results.some(result => result))
        break
      }
      case 'none': {
        resolve(!results.every(result => result))
        break
      }
    }
  })
}

/**
 * @internal defaults for validation method and object
 */

// export const _: ValidationRuleObject = {
//   _skip: false,
//   skip: SKIP_PROTO,
//   validate(value: any) {
//     return false
//   },
//   /* c8 ignore next 3 */
//   label() {
//     return ''
//   },
// }
