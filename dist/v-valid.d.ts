import { ComputedRef } from 'vue-demi';
import { Ref } from 'vue-demi';
import { UnwrapRef } from 'vue-demi';

/**
 * @rule Value must pass every provided check
 * @param rules Single or multiple validation rules
 */
export declare function $and(...rules: ValidationRule[]): ValidationRule;

export declare namespace $and {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @rule Value must fail the check or list of all provided checks
 * @param rules Single or multiple validation rules
 */
export declare function $not(...rules: ValidationRule[]): ValidationRule;

export declare namespace $not {
    var skip: ValidationRule;
}

/**
 * @rule Value must pass at least one of the provided checks
 * @param rules Single or multiple validation rules
 */
export declare function $or(...rules: ValidationRule[]): ValidationRule;

export declare namespace $or {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * Shorthand for calling `rule(...args).validate(value)`
 *
 * @Rule Execute validation against a provided value outside of the validation
 * scope. This helper can be also used within `validateIf` and `validateIfNot`
 *
 * @param rule Validation rule
 * @param value Value to validate
 * @returns Wether the provided value passes the provided check
 */
export declare function $test(rule: ValidationRule, value: any): Promise<boolean> | boolean;

/**
 * @Rule Perform validation if provided condition is met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */
export declare function $validateIf(condition: boolean | (() => boolean) | Ref<boolean> | Promise<boolean>, rule: ValidationRule): ValidationRule | Promise<ValidationRule>;

/**
 * @Rule Perform validation if provided condition is not met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */
export declare function $validateIfNot(condition: boolean | (() => boolean) | Ref<boolean> | Promise<boolean>, rule: ValidationRule): ValidationRule | Promise<ValidationRule>;

/**
 *
 * Helper method which adds custom message to any validation.
 *
 * ```ts
 * minLength: withLabel("Too short!", minLength(10))
 * ```
 *
 * @param message Custom message to display in the returned error
 * @param validator Validation rule
 */
export declare function $withLabel(message: string | Label, validator: ValidationRule): ValidationRule;

/**
 * @Rule Checks if value is between the provided range
 * @param min Minimum value
 * @param max Maximum value
 */
export declare function between(min: number | Date | Ref<number | Date>, max: number | Date | Ref<number | Date>): {
    __skip: boolean;
    name: string;
    validate: (value: any) => boolean;
    label: () => string;
};

export declare namespace between {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @Rule Checks wether string input contains certain words or characters
 * @param toInclude Word(s) or character(s) to check for
 * @param exact Should it split sentences into words or check against the entire string
 */
export declare function contains(toInclude: string | string[], exact?: boolean): ValidationRule;

export declare namespace contains {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * Simple rule definition. This method takes in a method wihout params and returns a simple rule.
 * This rule is 'as is' and does not take in any parameters nor can it be called.
 */
export declare function createRule(rule: (value: any) => boolean | Promise<boolean>, label?: DefLabel, name?: string): ValidationRuleObject;

export declare function createRuleArg<P = RuleParams>(rule: (value: any, params: P) => boolean | Promise<boolean>, label?: DefParamLabel<P>, name?: string): (params: P) => ValidationRule;

declare type DeepKeys<T> = DropInitDot<_DeepKeys<FixArr<T>>>;

declare type _DeepKeys<T> = T extends object ? ({
    [K in (string | number) & keyof T]: `${(`.${K}` | (`${K}` extends `${number}` ? `[${K}]` : never))}${'' | _DeepKeys<FixArr<T[K]>>}`;
}[(string | number) & keyof T]) : never;

declare type DefLabel = string | ((value: any) => string);

/**
 * This method produces rules which require parameter object. This allows user to
 * create more complex rules
 */
declare type DefParamLabel<P = undefined> = string | ((value: any, params: P) => string);

declare type DropInitDot<T> = T extends `.${infer U}` ? U : T;

/**
 * @Rule Input must be a valid email address
 */
export declare const email: ValidationRuleObject;

/**
 * @Rule Checks wether a string ends with the provided value
 * @param str The checked value
 * @param position At which character index from the end  should the matching begin
 */
export declare function endsWith(str: string | Ref<string>, position?: number): {
    __skip: boolean;
    name: string;
    validate: (value: any) => boolean;
    label: (value: any) => string;
};

export declare namespace endsWith {
    var skip: (..._args: any[]) => ValidationRule;
}

declare type FixArr<T> = T extends readonly any[] ? Omit<T, Exclude<keyof any[], number>> : T;

/**
 * @Rule Checks wether an input contains any special characters
 */
export declare const hasSpecialChars: ValidationRuleObject;

/**
 * @Rule Checkes wether value is an Array
 * @param value Input value
 */
export declare const isArr: Type['arr'];

/**
 * @Rule Checkes wether value is a valid Date object
 * @param value Input value
 */
export declare const isDate: Type['date'];

/**
 * @Rule Checkes wether value is a Map
 * @param value Input value
 */
export declare const isMap: Type['map'];

/**
 * @Rule Checkes wether value is a number
 * @param value Input value
 */
export declare const isNum: Type['num'];

/**
 * @Rule Checkes wether value is an Object
 * @param value Input value
 */
export declare const isObj: Type['obj'];

/**
 * @Rule Checkes wether value is a Set
 * @param value Input value
 */
export declare const isSet: Type['set'];

/**
 * @Rule Checkes wether value is a string
 * @param value Input value
 */
export declare const isStr: Type['str'];

/**
 * @Rule Checkes wether value is a Symbol
 * @param value Input value
 */
export declare const isSymbol: Type['symbol'];

declare type Label = (value: any, args?: Record<string, unknown>) => string;

/**
 * @Rule Input must pass the provided regex test
 * @param regex Regex validation rule
 */
export declare function match(regex: RegExp | string): ValidationRule;

export declare namespace match {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @Rule Input must be equal or lesser than the provided amount
 * @param max Maximum allowed length the input must satisfy
 */
export declare function maxLength(max: number | Ref<number>): ValidationRule;

export declare namespace maxLength {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @Rule Input must be a string and excluding spaces must be equal or lesser to the provided max value
 * @param max Maximum allowed length
 */
export declare function maxLenNoSpace(max: number | Ref<number>): ValidationRule;

export declare namespace maxLenNoSpace {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @Rule Input must be a number or a date which satisfies the maximum provided value.
 * @param max maximum allowed value
 */
export declare function maxValue(max: number | Date | Ref<number | Date>): ValidationRule;

export declare namespace maxValue {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @Rule Input must be equal or greater than the provided amount
 * @param min Minimum allowed length the input must satisfy
 */
export declare function minLength(min: number | Ref<number>): ValidationRule;

export declare namespace minLength {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @Rule Input must be a string and excluding spaces must be equal or greater to the provided min value
 * @param min Minimum allowed length
 */
export declare function minLenNoSpace(min: number | Ref<number>): ValidationRule;

export declare namespace minLenNoSpace {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @Rule Input must be a number or a date which satisfies the minimum provided value.
 * @param min Minimum allowed value
 */
export declare function minValue(min: number | Date | Ref<number | Date>): ValidationRule;

export declare namespace minValue {
    var skip: (..._args: any[]) => ValidationRule;
}

declare type ReplacePrimitives<T, ReplaceWith> = T extends Record<string, unknown> ? {
    [K in keyof T]: ReplacePrimitives<T[K], ReplaceWith>;
} : ReplaceWith;

/**
 * @Rule Input must not be empty, null or undefined.
 * If input is number with value 0, it will return true as value was provided
 */
export declare const required: ValidationRuleObject;

declare type RuleParams = Record<string, any>;

/**
 * @Rule Input must match the provided `compared` value, either by value or by type & value
 * @param compared The value we compare to the input
 * @param lenient Wether to compare values as == or === (default ===)
 */
export declare function sameAs(compared: any | Ref<any>, lenient?: boolean): ValidationRule;

export declare namespace sameAs {
    var skip: (..._args: any[]) => ValidationRule;
}

/**
 * @Rule Checks wether a string starts with the provided value
 * @param str The checked value
 * @param position At which character index should the matching begin
 */
export declare function startsWith(str: string | Ref<string>, position?: number): {
    __skip: boolean;
    name: string;
    validate: (value: any) => boolean;
    label: (value: any) => string;
};

export declare namespace startsWith {
    var skip: (..._args: any[]) => ValidationRule;
}

declare interface Type {
    str: ValidationRuleObject;
    num: ValidationRuleObject;
    arr: ValidationRuleObject;
    obj: ValidationRuleObject;
    set: ValidationRuleObject;
    map: ValidationRuleObject;
    date: ValidationRuleObject;
    symbol: ValidationRuleObject;
}

export declare const type: Type;

/**
 * @Rule Input must be a valid URL
 */
export declare const url: ValidationRuleObject;

/**
 *
 * @param form Reactive object which will be validated
 * @param rules Object which includes rules appended to the keys which match the structure of the `form`
 *
 * Optionally, you can pass in an options object
 * - `proactive`: Boolean - perform validation on every form change
 * - `autoclear`: Boolean - reset changes on first input after validation
 */
export declare function useValidation<F extends Record<string, any>, R extends Partial<Record<keyof F, any>> | ComputedRef<Partial<Record<keyof F, any>>>>(form: F, rules: R, { proactive, autoclear }?: ValidationOptions): {
    reset: () => void;
    validate: (...rulesToOnlyValidate: string[]) => Promise<ReplacePrimitives<F, ValidationError>>;
    addError: (path: DeepKeys<F>, error: {
        key: string;
        message: string;
    }) => void;
    errors: Ref<UnwrapRef<ReplacePrimitives<F, ValidationError>>>;
    anyError: Ref<boolean>;
    pending: Ref<boolean>;
};

export declare interface ValidationError {
    id: string | null;
    value: any;
    invalid: boolean;
    errors: Record<string, string>;
}

declare interface ValidationOptions {
    proactive?: boolean;
    autoclear?: boolean;
}

declare interface ValidationRule {
    __skip: boolean;
    validate: (arg: any) => Promise<boolean> | boolean;
    label: Label;
    name: string;
}

declare interface ValidationRuleObject extends ValidationRule {
    skip: () => void;
}

export { }


declare namespace $and {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace $or {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace $not {
    var skip: ValidationRule;
}


declare namespace sameAs {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace maxLength {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace match {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace between {
    var skip: (..._args: any[]) => import("../types").ValidationRule;
}


declare namespace maxValue {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace minValue {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace maxLenNoSpace {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace minLength {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace minLenNoSpace {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace startsWith {
    var skip: (..._args: any[]) => import("../../types").ValidationRule;
}


declare namespace endsWith {
    var skip: (..._args: any[]) => import("../../types").ValidationRule;
}


declare namespace contains {
    var skip: (..._args: any[]) => ValidationRule;
}


declare namespace password {
    var skip: (..._args: any[]) => ValidationRule;
}

