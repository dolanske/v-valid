import type { Ref } from 'vue-demi';
import type { ValidationRule } from '../types';
/**
 * @Rule Input must be a number or a date which satisfies the maximum provided value.
 * @param max maximum allowed value
 */
declare const maxValue: {
    (max: number | Date | Ref<number | Date>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { maxValue, };
