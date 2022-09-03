export const delay = <T = any>(ms: number) =>
  new Promise<T>((resolve) => setTimeout(resolve, ms))
