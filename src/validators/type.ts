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
import { ValidationRule } from "../types"

export const type = {
  str: {
    /**
     * @Rule Checkes wether value is a string
     * @param value Input value
     */
    _validate: (value: any) => {
      if (isNil(value)) return false
      return isString(value)
    },
    _message: ({ value }) => `Value <${typeof value}> must be a string`
  } as ValidationRule,
  num: {
    /**
     * @Rule Checkes wether value is a number
     * @param value Input value
     */
    _validate: (value: any) => {
      if (isNil(value)) return false
      return isNumber(value)
    },
    _message: ({ value }) => `Value <${typeof value}> must be a number`
  } as ValidationRule,
  arr: {
    /**
     * @Rule Checkes wether value is an Array
     * @param value Input value
     */
    _validate: (value: any) => {
      if (isNil(value)) return false
      return isArray(value)
    },
    _message: ({ value }) => `Value <${typeof value}> must be an Array`
  } as ValidationRule,
  obj: {
    /**
     * @Rule Checkes wether value is an Object
     * @param value Input value
     */
    _validate: (value: any) => {
      if (isNil(value) || isArray(value) || isSet(value) || isMap(value))
        return false
      return isObject(value)
    },
    _message: ({ value }) => `Value <${typeof value}> must be an Object`
  } as ValidationRule,
  set: {
    /**
     * @Rule Checkes wether value is a Set
     * @param value Input value
     */
    _validate: (value: any) => {
      if (isNil(value)) return false
      return isSet(value)
    },
    _message: ({ value }) => `Value <${typeof value}> must be a Set`
  } as ValidationRule,
  map: {
    /**
     * @Rule Checkes wether value is a Map
     * @param value Input value
     */
    _validate: (value: any) => {
      if (isNil(value)) return false
      return isMap(value)
    },
    _message: ({ value }) => `Value <${typeof value}> must be a Map`
  } as ValidationRule,
  date: {
    /**
     * @Rule Checkes wether value is a valid Date object
     * @param value Input value
     */
    _validate: (value: any) => {
      if (isNil(value) || value == "Invalid Date") return false

      // If it is a date object already, just check it
      if (isDate(value) && value.getTime()) return true

      // If value is a string, try and parse it
      const d = new Date(value)
      return isDate(d)
    },
    _message: ({ value }) =>
      `Value <${typeof value}> must be a valid Date object`
  } as ValidationRule
}
