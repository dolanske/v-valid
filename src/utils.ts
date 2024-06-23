import { isFunction, isPlainObject } from 'lodash-es'

export function delay<T = any>(ms: number) {
  return new Promise<T>(resolve => setTimeout(resolve, ms))
}

export function parsePath(path: string) {
  return path.trim().replace(' ', '.')
}

export function extractName(param: unknown) {
  if (!param)
    return null

  if (isFunction(param))
    return param.name

  return Object.keys(param)[0]
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
