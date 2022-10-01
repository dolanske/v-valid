export interface Error {
  id: string | null
  value: any
  invalid: boolean
  errors: { [key: string]: string }
}

export interface Errors {
  [key: string]: Error
}

export type Label = (value: any, ...args: any[]) => string

export interface ValidationRule {
  _skip: boolean

  validate: (arg: any) => Promise<boolean> | boolean
  // These optional destructured parameters serve as a
  // foundation to better compose error messages
  label: Label
}

export interface ValidationRuleObject extends ValidationRule {
  skip: () => void
}

export interface Rule {
  [key: string]: ValidationRule
}

export interface ValidationOptions {
  // Perform validation on each value update
  proactive?: boolean
  autoclear?: boolean
}
