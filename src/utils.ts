import { unref } from 'vue'
import type { MaybePromise, MaybeRefOrGetter } from './types'

export function isNil(value: unknown): value is undefined | null {
  return value === null || value === undefined
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date
}

export function isArray(value: unknown): value is any[] {
  return Array.isArray(value)
}

export function isMap(value: unknown): value is Map<any, any> {
  return value instanceof Map
}

export function isSet(value: unknown): value is Set<any> {
  return value instanceof Set
}

export function isPromise(value: unknown): value is Promise<any> {
  return !isNil(value) && isFunction((value as any).then)
}

/**
 * Object literal (or `Object.create(null)`), including Vue reactive proxies of
 * them. Class instances such as Date, Map, File... are not plain.
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
  if (typeof value !== 'object' || value === null)
    return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/**
 * Resolves a plain value, a ref or a getter to its current value
 */
export function toValue<T>(source: MaybeRefOrGetter<T>): T {
  return isFunction(source) ? source() : unref(source)
}

/**
 * Number of items in a string, array, Map, Set or plain object. `NaN` for
 * anything else so that every comparison against it fails.
 */
export function sizeOf(value: unknown): number {
  if (isString(value) || isArray(value))
    return value.length
  if (isMap(value) || isSet(value))
    return value.size
  if (isPlainObject(value))
    return Object.keys(value).length
  return Number.NaN
}

/**
 * `true` for null, undefined, NaN, invalid dates, empty strings and empty
 * collections. Numbers (including 0) and booleans are never empty.
 */
export function isEmpty(value: unknown): boolean {
  if (isNil(value))
    return true
  if (isNumber(value))
    return Number.isNaN(value)
  if (isDate(value))
    return Number.isNaN(value.getTime())
  const size = sizeOf(value)
  return Number.isNaN(size) ? false : size === 0
}

/**
 * Applies `fn` to `value`, awaiting it first only if it is a promise. Keeps
 * synchronous code paths synchronous.
 */
export function chain<T, R>(value: MaybePromise<T>, fn: (value: T) => MaybePromise<R>): MaybePromise<R> {
  return isPromise(value) ? value.then(fn) : fn(value)
}

export type PathSegments = readonly string[]

export function toSegments(path: string | PathSegments): PathSegments {
  return isString(path) ? path.split('.') : path
}

/**
 * Reads a nested value. Returns `undefined` if any segment is missing.
 */
export function getIn(obj: unknown, path: PathSegments): any {
  let current: any = obj
  for (const segment of path) {
    if (isNil(current))
      return undefined
    current = current[segment]
  }
  return current
}

/**
 * Writes a nested value, creating intermediate plain objects as needed.
 */
export function setIn(obj: Record<string, any>, path: PathSegments, value: unknown) {
  let current = obj
  const last = path.length - 1

  for (let i = 0; i < last; i++) {
    const segment = path[i]
    if (!isPlainObject(current[segment]))
      current[segment] = {}
    current = current[segment]
  }

  current[path[last]] = value
}

/**
 * Whether `selector` is equal to or a parent of `path`
 */
export function isPathPrefix(selector: PathSegments, path: PathSegments) {
  if (selector.length > path.length)
    return false
  for (let i = 0; i < selector.length; i++) {
    if (selector[i] !== path[i])
      return false
  }
  return true
}
