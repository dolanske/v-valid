import { isFunction } from 'lodash-es'

export const delay = <T = any>(ms: number) =>
  new Promise<T>(resolve => setTimeout(resolve, ms))

export const parsePath = (path: string) => {
  return path.trim().replace(' ', '.')
}

export function extractName(param: unknown) {
  if (!param)
    return null

  if (isFunction(param))
    return param.name

  return Object.keys(param)[0]
}
