import type { Ref } from 'vue-demi';
import type { ValidationRule } from '../../types';
/**
 * @Rule Input must be a string and excluding spaces must be equal or lesser to the provided max value
 * @param max Maximum allowed length
 */
declare const maxLenNoSpace: {
    (max: number | Ref<number>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { maxLenNoSpace };
