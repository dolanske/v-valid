import type { ValidationRule, ValidationRuleObject } from '../types';
type DefLabel = string | ((value: any) => string);
/**
 * Simple rule definition. This method takes in a method wihout params and returns a simple rule.
 * This rule is 'as is' and does not take in any parameters nor can it be called.
 */
declare function $def(rule: (value: any) => boolean | Promise<boolean>, label?: DefLabel): ValidationRuleObject;
/**
 * This method produces rules which require parameter object. This allows user to
 * create more complex rules
 */
type DefParamLabel<P = undefined> = string | ((value: any, params: P) => string);
type RuleParams = Record<string, any>;
declare function $defParam<P = RuleParams>(rule: (value: any, params: P) => boolean | Promise<boolean>, label?: DefParamLabel<P>): (params: P) => ValidationRule;
export { $def, $defParam, };
