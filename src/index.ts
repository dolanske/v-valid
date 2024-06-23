import { reactive } from 'vue'
import { defineRules } from './core/rules'
import { required } from './validators/required'
import { minLength } from './validators/minLength'
import { maxLength } from './validators/maxLength'
import { useValidation } from './core/validate'

/**
 * Core
 */
export { useValidation } from './core/validate'
export { createRule, createRuleArg } from './core/define'

/**
 * Helpers
 */
export { $withLabel } from './helpers/withLabel'
export { $validateIf } from './helpers/validateIf'
export { $validateIfNot } from './helpers/validateIfNot'
export { $and } from './helpers/and'
export { $or } from './helpers/or'
export { $not } from './helpers/not'
export { $test } from './helpers/test'

/**
 * Validators
 */
export { required } from './validators/required'
export { minLength } from './validators/minLength'
export { maxLength } from './validators/maxLength'
export { email } from './validators/email'
export { sameAs } from './validators/sameAs'
export { match } from './validators/match'

export { url } from './validators/url'
export { between } from './validators/between'
export { minValue } from './validators/minValue'
export { maxValue } from './validators/maxValue'
export { maxLenNoSpace } from './validators/string/maxLenNoSpace'
export { minLenNoSpace } from './validators/string/minLenNoSpace'
export { hasSpecialChars } from './validators/string/hasSpecialChars'
export { contains } from './validators/string/contains'
export { startsWith } from './validators/string/startswith'
export { endsWith } from './validators/string/endsWith'
export {
  type,
  str as isStr,
  num as isNum,
  arr as isArr,
  obj as isObj,
  set as isSet,
  map as isMap,
  date as isDate,
  symbol as isSymbol,
} from './validators/type'

export type {
  ValidationError,
} from './types'
