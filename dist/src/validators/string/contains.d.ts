import type { ValidationRule } from '../../types';
/**
 * @Rule Checks wether string input contains certain words or characters
 * @param toInclude Word(s) or character(s) to check for
 * @param exact Should it split sentences into words or check against the entire string
 */
declare const contains: {
    (toInclude: string | string[], exact?: boolean): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { contains, };
