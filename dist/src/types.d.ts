export interface Error {
    id: string | null;
    value: any;
    invalid: boolean;
    errors: {
        [key: string]: string;
    };
}
export interface Errors {
    [key: string]: Error;
}
export type Label = (value: any, args?: Record<string, unknown>) => string;
export interface ValidationRule {
    _skip: boolean;
    validate: (arg: any) => Promise<boolean> | boolean;
    label: Label;
}
export interface ValidationRuleObject extends ValidationRule {
    skip: () => void;
}
export interface Rule {
    [key: string]: ValidationRule;
}
export interface ValidationOptions {
    proactive?: boolean;
    autoclear?: boolean;
}
