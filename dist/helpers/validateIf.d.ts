import type { Ref } from 'vue-demi';
import type { ValidationRule } from '../types';
/**
 * @Rule Perform validation if provided condition is met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */
export declare const $validateIf: (condition: boolean | (() => boolean) | Ref<boolean> | Promise<boolean>, rule: ValidationRule) => ValidationRule | Promise<ValidationRule>;
