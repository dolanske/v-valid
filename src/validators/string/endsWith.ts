import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../../shared'

/**
 * @Rule Checks wether a string ends with the provided value
 * @param str The checked value
 * @param position At which character index from the end  should the matching begin
 */

function endsWith(str: string | Ref<string>, position?: number) {
  return {
    _skip: false,
    name: 'endsWith',

    validate: (value: any) => {
      str = unref(str)

      if (!value || typeof value !== 'string')
        return false

      return value.endsWith(str, position)
    },
    label: (value: any) => {
      if (typeof value !== 'string')
        return `Value must be a string and end with '${unref(str)}'`

      return `Value must end with '${unref(str)}'`
    },
  }
}

endsWith.skip = SKIP_PROTO

export {
  endsWith,
}
