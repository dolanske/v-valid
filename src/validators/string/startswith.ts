import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../../shared'

/**
 * @Rule Checks wether a string starts with the provided value
 * @param str The checked value
 * @param position At which character index should the matching begin
 */

function startsWith(str: string | Ref<string>, position?: number) {
  return {
    __skip: false,
    name: 'startsWith',
    validate: (value: any) => {
      str = unref(str)

      if (!value || typeof value !== 'string')
        return false

      return value.startsWith(str, position)
    },
    label: (value: any) => {
      if (typeof value !== 'string')
        return `Value must be a string and start with '${unref(str)}'`

      return `Value must start with '${unref(str)}'`
    },
  }
}

startsWith.skip = SKIP_PROTO

export {
  startsWith,
}
