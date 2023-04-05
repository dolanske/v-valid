import type { ValidationRuleObject } from '../types';
/**
 * @Rule Input must not be empty, null or undefined.
 * If input is number with value 0, it will return true as value was provided
 */
export declare const required: ValidationRuleObject;
