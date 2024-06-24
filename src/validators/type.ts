import {
  isArray,
  isDate,
  isMap,
  isNil,
  isNumber,
  isObject,
  isSet,
  isString,
  isSymbol,
} from 'lodash-es'
import { SKIP_PROTO } from '../shared'
import type { ValidationRuleObject } from '../types'

interface Type {
  str: ValidationRuleObject
  num: ValidationRuleObject
  arr: ValidationRuleObject
  obj: ValidationRuleObject
  set: ValidationRuleObject
  map: ValidationRuleObject
  date: ValidationRuleObject
  symbol: ValidationRuleObject
}

/**
 * @Rule Checkes wether value is a string
 * @param value Input value
 */
export const str: Type['str'] = {
  __skip: false,
  name: 'str',
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false
    return isString(value)
  },
  label: ({ value }) => `Value <${typeof value}> must be a string`,
}

/**
 * @Rule Checkes wether value is a number
 * @param value Input value
 */
export const num: Type['num'] = {
  name: 'num',
  __skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false
    return isNumber(value)
  },
  label: ({ value }) => `Value <${typeof value}> must be a number`,
}

/**
 * @Rule Checkes wether value is an Array
 * @param value Input value
 */

export const arr: Type['arr'] = {
  name: 'arr',
  __skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false
    return isArray(value)
  },
  label: ({ value }) => `Value <${typeof value}> must be an Array`,
}

/**
 * @Rule Checkes wether value is an Object
 * @param value Input value
 */

export const obj: Type['obj'] = {
  name: 'obj',
  __skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value) || isArray(value) || isSet(value) || isMap(value))
      return false
    return isObject(value)
  },
  label: ({ value }) => `Value <${typeof value}> must be an Object`,
}

/**
 * @Rule Checkes wether value is a Set
 * @param value Input value
 */

export const set: Type['set'] = {
  name: 'set',
  __skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false
    return isSet(value)
  },
  label: ({ value }) => `Value <${typeof value}> must be a Set`,
}

/**
 * @Rule Checkes wether value is a Map
 * @param value Input value
 */

export const map: Type['map'] = {
  name: 'map',
  __skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false
    return isMap(value)
  },
  label: ({ value }) => `Value <${typeof value}> must be a Map`,
}

/**
 * @Rule Checkes wether value is a valid Date object
 * @param value Input value
 */

export const date: Type['date'] = {
  name: 'date',
  __skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    // eslint-disable-next-line eqeqeq
    if (isNil(value) || value == 'Invalid Date')
      return false

    // If it is a date object already, just check it
    if (isDate(value) && value.getTime())
      return true

    // If value is a string, try and parse it
    const d = new Date(value)
    return isDate(d)
  },
  label: ({ value }) => `Value <${typeof value}> must be a valid Date object`,
}

/**
 * @Rule Checkes wether value is a Symbol
 * @param value Input value
 */

export const symbol: Type['symbol'] = {
  name: 'symbol',
  __skip: false,
  skip: SKIP_PROTO,
  validate: (value: any) => {
    if (isNil(value))
      return false

    return isSymbol(value)
  },
  label: ({ value }) => `Value <${typeof value}> must be a Symbol`,
}

export const type: Type = {
  str,
  num,
  arr,
  obj,
  set,
  map,
  date,
  symbol,
}
