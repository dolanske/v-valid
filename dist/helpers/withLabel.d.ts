import type { Label, ValidationRule } from '../types';
/**
 *
 * Helper method which adds custom message to any validation.
 *
 * ```ts
 * minLength: withLabel("Too short!", minLength(10))
 * ```
 *
 * @param message Custom message to display in the returned error
 * @param validator Validation rule
 */
export declare const $withLabel: (message: string | Label, validator: ValidationRule) => ValidationRule;
