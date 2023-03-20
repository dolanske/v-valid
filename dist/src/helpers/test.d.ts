import type { ValidationRule } from '../types';
/**
 * Shorthand for calling `rule(...args).validate(value)`
 *
 * @Rule Execute validation against a provided value outside of the validation
 * scope. This helper can be also used within `validateIf` and `validateIfNot`
 *
 * @param rule Validation rule
 * @param value Value to validate
 * @returns Wether the provided value passes the provided check
 */
export declare const $test: (rule: ValidationRule, value: any) => Promise<boolean> | boolean;
