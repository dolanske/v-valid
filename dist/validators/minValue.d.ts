import type { Ref } from 'vue-demi';
import type { ValidationRule } from '../types';
/**
 * @Rule Input must be a number or a date which satisfies the minimum provided value.
 * @param min Minimum allowed value
 */
declare const minValue: {
    (min: number | Date | Ref<number | Date>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { minValue, };
