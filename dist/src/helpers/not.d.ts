import type { ValidationRule } from '../types';
/**
 * @rule Value must fail the check or list of all provided checks
 * @param rules Single or multiple validation rules
 */
declare const $not: {
    (...rules: ValidationRule[]): ValidationRule;
    skip: ValidationRule;
};
export { $not };
