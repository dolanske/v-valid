import { isPlainObject } from 'lodash-es'

export function delay<T = any>(ms: number) {
  return new Promise<T>(resolve => setTimeout(resolve, ms))
}

export function parsePath(path: string) {
  return path.trim().replace(' ', '.')
}

export async function iterateIn(
  obj: Record<string, any>,
  callback: (key: string, value: any, path: string) => Promise<void> | void,
  path = '',
): Promise<void> {
  for (const key in obj) {
    const newPath = `${path} ${key}`.trim()

    if (isPlainObject(obj[key]))
      iterateIn(obj[key], callback, newPath)
    else
      await callback(key, obj[key], newPath)
  }
}

export function iterateInSync(
  obj: Record<string, any>,
  callback: (key: string, value: any, path: string) => void,
  path = '',
) {
  for (const key in obj) {
    const newPath = `${path} ${key}`.trim()

    if (isPlainObject(obj[key]))
      iterateIn(obj[key], callback, newPath)
    else
      callback(key, obj[key], newPath)
  }
}

export function isNil(value: any): value is undefined | null {
  return value === null || value === undefined 
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function' && value instanceof Function
}

export function isNumber(value: any): value is number {
  return typeof value === 'number'
}

export function isDate(value: any): value is Date {
  return value instanceof Date
}