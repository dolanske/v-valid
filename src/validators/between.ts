import { isNil } from "lodash"
import { SKIP_PROTO } from "../shared"
import { type } from "./type"

/**
 * @Rule Checks if value is between the provided range
 *
 * @param min Minimum value
 * @param max Maximum value
 */

const between = (min: number | Date, max: number | Date) => ({
  _skip: false,
  validate(value: any) {
    if (isNil(value)) return false

    if (type.date.validate(value)) {
      min = min instanceof Date ? min.getTime() : new Date(min).getTime()
      max = max instanceof Date ? max.getTime() : new Date(max).getTime()
      value =
        value instanceof Date ? value.getTime() : new Date(value).getTime()
    }

    return value >= min && value <= max
  },
  label: () => `Value must be between ${min} and ${max}`
})

between.skip = SKIP_PROTO

export { between }
