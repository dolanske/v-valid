import type { ValidationRule, ValidationRuleObject } from './types';
/**
 * @internal
 * Sets validation skip to true
 */
export declare const SKIP_PROTO: (..._args: any[]) => ValidationRule;
/**
 * @internal
 * Validates multiple rules
 */
export declare const validateEntries: (value: any, rules: Array<ValidationRule | ValidationRuleObject>, mode: 'every' | 'some' | 'none') => Promise<boolean>;
