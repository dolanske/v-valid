import type { ValidationRule } from '../types';
/**
 * @rule Value must pass at least one of the provided checks
 * @param rules Single or multiple validation rules
 */
declare const $or: {
    (...rules: ValidationRule[]): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { $or };
