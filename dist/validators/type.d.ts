import type { ValidationRuleObject } from '../types';
interface Type {
    str: ValidationRuleObject;
    num: ValidationRuleObject;
    arr: ValidationRuleObject;
    obj: ValidationRuleObject;
    set: ValidationRuleObject;
    map: ValidationRuleObject;
    date: ValidationRuleObject;
    symbol: ValidationRuleObject;
}
/**
 * @Rule Checkes wether value is a string
 * @param value Input value
 */
export declare const str: Type['str'];
/**
 * @Rule Checkes wether value is a number
 * @param value Input value
 */
export declare const num: Type['num'];
/**
 * @Rule Checkes wether value is an Array
 * @param value Input value
 */
export declare const arr: Type['arr'];
/**
 * @Rule Checkes wether value is an Object
 * @param value Input value
 */
export declare const obj: Type['obj'];
/**
 * @Rule Checkes wether value is a Set
 * @param value Input value
 */
export declare const set: Type['set'];
/**
 * @Rule Checkes wether value is a Map
 * @param value Input value
 */
export declare const map: Type['map'];
/**
 * @Rule Checkes wether value is a valid Date object
 * @param value Input value
 */
export declare const date: Type['date'];
/**
 * @Rule Checkes wether value is a Symbol
 * @param value Input value
 */
export declare const symbol: Type['symbol'];
export declare const type: Type;
export {};
