export const delay = <T = any>(ms: number) =>
  new Promise<T>((resolve) => setTimeout(resolve, ms))

// const flattenObject = (obj: any, prefix = "") =>
//   Object.keys(obj).reduce((acc, k) => {
//     const pre = prefix.length ? prefix + "." : ""
//     if (typeof obj[k] === "object") {
//       Object.assign(acc, flattenObject(obj[k], pre + k))
//     } else {
//       acc[pre + k] = obj[k]
//     }
//     return acc
//   }, {} as any)
