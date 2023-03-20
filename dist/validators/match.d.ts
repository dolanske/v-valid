import type { ValidationRule } from '../types';
/**
 * @Rule Input must pass the provided regex test
 * @param regex Regex validation rule
 */
declare const match: {
    (regex: RegExp | string): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { match };
