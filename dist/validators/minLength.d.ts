import type { Ref } from 'vue-demi';
import type { ValidationRule } from '../types';
/**
 * @Rule Input must be equal or greater than the provided amount
 * @param min Minimum allowed length the input must satisfy
 */
declare const minLength: {
    (min: number | Ref<number>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { minLength };
