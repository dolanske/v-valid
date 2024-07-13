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

  if (isObject(value))
    return Object.keys(value).length <= 0

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

// FIXME
// keys in the same nesting get overwritten? or not saved at all?

// Set deep value in an object at the provided path
export function setDeep(obj: object, path: string, value: any) {
  if (isNil(obj) || !isObject(obj))
    return

  // In case there are spaces, replace those with "."
  path = parsePath(path.trim())
  const segments = path.split('.')

  let prevObjectLevel = obj

  for (const segment of segments) {
    // Skip empty strings
    if (segment.length === 0)
      continue

    // FIXME
    // Something here is WRONG
    if (segment !== segments.at(-1)) {
      const existingSegmentValue = Reflect.get(prevObjectLevel, segment)
      Reflect.set(prevObjectLevel, segment, isObject(existingSegmentValue) ? existingSegmentValue : {})
      prevObjectLevel = Reflect.get(prevObjectLevel, segment)
    }
    else {
      Reflect.set(prevObjectLevel, segment, value)
      break
    }
  }
}

// Get deep object value at given path
export function getDeep(obj: object, path: string): any {
  if (isNil(obj) || !isObject(obj))
    return

  path = parsePath(path.trim())
  const segments = path.split('.')

  let returnValue = obj

  for (const segment of segments) {
    // Skip empty strings
    if (segment.length === 0)
      continue
    returnValue = Reflect.get(returnValue, segment)
  }

  return returnValue
}
