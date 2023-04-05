import type { Ref } from 'vue-demi';
import type { ValidationRule } from '../types';
/**
 * @Rule Input must match the provided `compared` value, either by value or by type & value
 * @param compared The value we compare to the input
 * @param lenient Wether to compare values as == or === (default ===)
 */
declare const sameAs: {
    (compared: any | Ref<any>, lenient?: boolean): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};
export { sameAs };
