export interface ValidationError {
  id: string | null
  value: any
  invalid: boolean
  errors: Record<string, string>
}

export type Errors = Record<string, ValidationError>

export type Label = (value: any, args?: Record<string, unknown>) => string

export interface ValidationRule {
  _skip: boolean
  validate: (arg: any) => Promise<boolean> | boolean
  label: Label
  name: string
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
