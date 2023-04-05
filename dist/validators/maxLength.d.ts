import type { Ref } from 'vue-demi';
import type { ValidationRule } from '../types';
/**
 * @Rule Input must be equal or lesser than the provided amount
 * @param max Maximum allowed length the input must satisfy
 */
declare const maxLength: {
    (max: number | Ref<number>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { maxLength };
