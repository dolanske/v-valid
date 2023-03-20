import type { Ref } from 'vue-demi';
import type { ValidationRule } from '../../types';
/**
 * @Rule Input must be a string and excluding spaces must be equal or greater to the provided min value
 * @param min Minimum allowed length
 */
declare const minLenNoSpace: {
    (min: number | Ref<number>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { minLenNoSpace };
