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

    if (isObject(obj[key]))
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

    if (isObject(obj[key]))
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
  return typeof value === 'number' || value instanceof Number
}

export function isDate(value: any): value is Date {
  return value instanceof Date
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

export function isString(value: any): value is string {
  return typeof value === 'string' || value instanceof String
}

export function isEmpty(value: any) {
  if (isNil(value))
    return true

  if ('length' in value)
    return value.length <= 0

  if ('size' in value)
    return value.size <= 0

  return true
}

export function isMap(value: any): value is Map<any, any> {
  return value instanceof Map
}

export function isObject(value: any): value is object {
  return typeof value === 'object' && !isArray(value) && !isNil(value) && !isFunction(value)
}

export function isSet(value: any): value is Set<any> {
  return value instanceof Set
}

export function isSymbol(value: any): value is symbol {
  return value instanceof Symbol
}

// TODO
// Replace lodash's set & get methods

function setPath() {}
function getPath() {}
