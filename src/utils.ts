import { isFunction } from 'lodash-es'

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
