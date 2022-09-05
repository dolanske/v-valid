import {
  isArray,
  isDate,
  isMap,
  isNil,
  isNumber,
  isObject,
  isSet,
  isString
} from "lodash"
import { SKIP_PROTO } from "../defaults"
import { ValidationRule, ValidationRuleObject } from "../types"

interface Type {
  str: ValidationRuleObject
  num: ValidationRuleObject
  arr: ValidationRuleObject
  obj: ValidationRuleObject
  set: ValidationRuleObject
  map: ValidationRuleObject
  date: ValidationRuleObject
}

export const type: Type = {
  str: {
    /**
     * @Rule Checkes wether value is a string
     * @param value Input value
     */
    _skip: false,
    skip: SKIP_PROTO,
    validate: (value: any) => {
      if (isNil(value)) return false
      return isString(value)
    },
    label: ({ value }) => `Value <${typeof value}> must be a string`
  },
  num: {
    /**
     * @Rule Checkes wether value is a number
     * @param value Input value
     */
    _skip: false,
    skip: SKIP_PROTO,
    validate: (value: any) => {
      if (isNil(value)) return false
      return isNumber(value)
    },
    label: ({ value }) => `Value <${typeof value}> must be a number`
  },
  arr: {
    /**
     * @Rule Checkes wether value is an Array
     * @param value Input value
     */
    _skip: false,
    skip: SKIP_PROTO,
    validate: (value: any) => {
      if (isNil(value)) return false
      return isArray(value)
    },
    label: ({ value }) => `Value <${typeof value}> must be an Array`
  },
  obj: {
    /**
     * @Rule Checkes wether value is an Object
     * @param value Input value
     */
    _skip: false,
    skip: SKIP_PROTO,
    validate: (value: any) => {
      if (isNil(value) || isArray(value) || isSet(value) || isMap(value))
        return false
      return isObject(value)
    },
    label: ({ value }) => `Value <${typeof value}> must be an Object`
  },
  set: {
    /**
     * @Rule Checkes wether value is a Set
     * @param value Input value
     */
    _skip: false,
    skip: SKIP_PROTO,
    validate: (value: any) => {
      if (isNil(value)) return false
      return isSet(value)
    },
    label: ({ value }) => `Value <${typeof value}> must be a Set`
  },
  map: {
    /**
     * @Rule Checkes wether value is a Map
     * @param value Input value
     */
    _skip: false,
    skip: SKIP_PROTO,
    validate: (value: any) => {
      if (isNil(value)) return false
      return isMap(value)
    },
    label: ({ value }) => `Value <${typeof value}> must be a Map`
  },
  date: {
    /**
     * @Rule Checkes wether value is a valid Date object
     * @param value Input value
     */
    _skip: false,
    skip: SKIP_PROTO,
    validate: (value: any) => {
      if (isNil(value) || value == "Invalid Date") return false

      // If it is a date object already, just check it
      if (isDate(value) && value.getTime()) return true

      // If value is a string, try and parse it
      const d = new Date(value)
      return isDate(d)
    },
    label: ({ value }) => `Value <${typeof value}> must be a valid Date object`
  }
}
