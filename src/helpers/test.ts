//TODO: Figure out naming

import { ValidationRule } from "../types"

export const test = async (
  rule: ValidationRule,
  value: any
): Promise<boolean> => {
  return rule.validate(value)
}
