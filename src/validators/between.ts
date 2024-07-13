import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import { SKIP_PROTO } from '../shared'
import { isNil } from '../utils'
import { type } from './type'

/**
 * @Rule Checks if value is between the provided range
 * @param min Minimum value
 * @param max Maximum value
 */

function between(min: number | Date | Ref<number | Date>, max: number | Date | Ref<number | Date>) {
  return {
    __skip: false,
    name: 'between',
    validate: (value: any) => {
      if (isNil(value))
        return false

      min = unref(min)
      max = unref(max)

      if (type.date.validate(value)) {
        min = min instanceof Date ? min.getTime() : new Date(min).getTime()
        max = max instanceof Date ? max.getTime() : new Date(max).getTime()
        value = value instanceof Date ? value.getTime() : new Date(value).getTime()
      }

      return value >= min && value <= max
    },
    label: () => {
    // Add error that
      return `Value must be between ${unref(min)} and ${unref(max)}`
    },
  }
}

between.skip = SKIP_PROTO

export { between }
