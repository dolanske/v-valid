export type Error = {
  type: string | null
  invalid: boolean
  errors: Set<string>
}

export interface Errors {
  [key: string]: Error
}

export type ValidationRule = {
  _validate: Function
  _message: Function
}

export type Rule = {
  [key: string]: ValidationRule
}

export interface ValidationOptions {
  // Perform validation on each value update
  proactive?: boolean
  autoclear?: boolean
}
