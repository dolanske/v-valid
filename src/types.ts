export interface ValidationError {
  id: string | null
  value: any
  invalid: boolean
  errors: Record<string, string>
}

export type Label = (value: any, args?: Record<string, unknown>) => string

export interface ValidationRule {
  __skip: boolean
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

// Replaces all (even deeply nested) primitives with the provided object. Marks
// the field as optional
export type ReplacePrimitivesOptional<T, ReplaceWith> = T extends Record<string, unknown>
  ? { [K in keyof T]?: ReplacePrimitivesOptional<T[K], ReplaceWith> }
  : ReplaceWith

// Replaces all (even deeply nested) primitives with the provided object
export type ReplacePrimitives<T, ReplaceWith> = T extends Record<string, unknown>
  ? { [K in keyof T]: ReplacePrimitives<T[K], ReplaceWith> }
  : ReplaceWith

// Type helpers for the nexty one -----vvvv
type FixArr<T> = T extends readonly any[] ? Omit<T, Exclude<keyof any[], number>> : T
type _DeepKeys<T> = T extends object ? (
  { [K in (string | number) & keyof T]:
        `${(
            `.${K}` | (`${K}` extends `${number}` ? `[${K}]` : never)
        )}${'' | _DeepKeys<FixArr<T[K]>>}` }[
    (string | number) & keyof T]
) : never

type DropInitDot<T> = T extends `.${infer U}` ? U : T

// Takes in an object and returns a union of all possible paths
export type DeepKeys<T> = DropInitDot<_DeepKeys<FixArr<T>>>
