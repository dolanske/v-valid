import type { ValidationRule } from '../types';
/**
 * @rule Value must pass every provided check
 * @param rules Single or multiple validation rules
 */
declare const $and: {
    (...rules: ValidationRule[]): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { $and };
