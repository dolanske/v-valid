export type Error = {
  type: string | null
  invalid: boolean
  errors: Set<string>
}

export interface Errors {
  [key: string]: Error
}

export type Message = (value: any, ...args: any[]) => string

export interface ValidationRule {
  _validate: (arg: any) => Promise<boolean> | boolean
  // These optional destructured parameters serve as a
  // foundation to better compose error messages
  _message: Message
}

export type Rule = {
  [key: string]: ValidationRule
}

export interface ValidationOptions {
  // Perform validation on each value update
  proactive?: boolean
  autoclear?: boolean
}
