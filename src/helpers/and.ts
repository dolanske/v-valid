import { ValidationRule } from "../types"

export const and = (...rules: ValidationRule[]): ValidationRule => {
  return {
    // Figure out how to add these
    _skip: false,
    validate(value: any) {
      return new Promise<boolean>(async (resolve) => {
        const results: boolean[] = []

        for (const rule of rules) {
          if (!rule.validate) {
            // If anything is missing, we can just break out of validating and
            resolve(false)
            break
          }

          const result = await rule.validate(value)
          results.push(result)
        }

        // We resolve either way, but its either true or false
        resolve(results.every((result) => result))
      })
    },
    label() {
      return "Value did not pass all the required checks"
    }
  }
}
