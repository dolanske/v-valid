import { isString } from "lodash"

export const type = {
  string: {
    /**
     *
     * @param value
     * @returns
     */
    _validate: (value: any) => isString(value),
    _message: () => "Value must be a string"
  }
}
