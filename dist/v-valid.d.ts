import type { ComputedRef } from 'vue-demi';
import type { Ref } from 'vue-demi';
import type { UnwrapRef } from 'vue-demi';

/**
 * @rule Value must pass every provided check
 * @param rules Single or multiple validation rules
 */
export declare const $and: {
    (...rules: ValidationRule[]): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * Simple rule definition. This method takes in a method wihout params and returns a simple rule.
 * This rule is 'as is' and does not take in any parameters nor can it be called.
 */
export declare function $def(rule: (value: any) => boolean | Promise<boolean>, label?: DefLabel): ValidationRuleObject;

export declare function $defParam<P = RuleParams>(rule: (value: any, params: P) => boolean | Promise<boolean>, label?: DefParamLabel<P>): (params: P) => ValidationRule;

/**
 * @rule Value must fail the check or list of all provided checks
 * @param rules Single or multiple validation rules
 */
export declare const $not: {
    (...rules: ValidationRule[]): ValidationRule;
    skip: ValidationRule;
};

/**
 * @rule Value must pass at least one of the provided checks
 * @param rules Single or multiple validation rules
 */
export declare const $or: {
    (...rules: ValidationRule[]): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

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
export declare const $test: (rule: ValidationRule, value: any) => Promise<boolean> | boolean;

/**
 * @Rule Perform validation if provided condition is met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */
export declare const $validateIf: (condition: boolean | (() => boolean) | Ref<boolean> | Promise<boolean>, rule: ValidationRule) => ValidationRule | Promise<ValidationRule>;

/**
 * @Rule Perform validation if provided condition is not met
 * @param condition Boolean or function returning boolean
 * @param rule Validation rule
 */
export declare const $validateIfNot: (condition: boolean | (() => boolean) | Ref<boolean> | Promise<boolean>, rule: ValidationRule) => ValidationRule | Promise<ValidationRule>;

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
export declare const $withLabel: (message: string | Label, validator: ValidationRule) => ValidationRule;

/**
 * @Rule Checks if value is between the provided range
 * @param min Minimum value
 * @param max Maximum value
 */
export declare const between: {
    (min: number | Date | Ref<number | Date>, max: number | Date | Ref<number | Date>): {
        _skip: boolean;
        validate: (value: any) => boolean;
        label: () => string;
    };
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * @Rule Checks wether string input contains certain words or characters
 * @param toInclude Word(s) or character(s) to check for
 * @param exact Should it split sentences into words or check against the entire string
 */
export declare const contains: {
    (toInclude: string | string[], exact?: boolean): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

declare type DefLabel = string | ((value: any) => string);

/**
 * This method produces rules which require parameter object. This allows user to
 * create more complex rules
 */
declare type DefParamLabel<P = undefined> = string | ((value: any, params: P) => string);

/**
 * @Rule Input must be a valid email address
 */
export declare const email: ValidationRuleObject;

/**
 * @Rule Checks wether a string ends with the provided value
 * @param str The checked value
 * @param position At which character index from the end  should the matching begin
 */
export declare const endsWith: {
    (str: string | Ref<string>, position?: number): {
        _skip: boolean;
        validate: (value: any) => boolean;
        label: (value: any) => string;
    };
    skip: (..._args: any[]) => ValidationRule;
};

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
export declare const match: {
    (regex: RegExp | string): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * @Rule Input must be equal or lesser than the provided amount
 * @param max Maximum allowed length the input must satisfy
 */
export declare const maxLength: {
    (max: number | Ref<number>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * @Rule Input must be a string and excluding spaces must be equal or lesser to the provided max value
 * @param max Maximum allowed length
 */
export declare const maxLenNoSpace: {
    (max: number | Ref<number>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * @Rule Input must be a number or a date which satisfies the maximum provided value.
 * @param max maximum allowed value
 */
export declare const maxValue: {
    (max: number | Date | Ref<number | Date>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * @Rule Input must be equal or greater than the provided amount
 * @param min Minimum allowed length the input must satisfy
 */
export declare const minLength: {
    (min: number | Ref<number>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * @Rule Input must be a string and excluding spaces must be equal or greater to the provided min value
 * @param min Minimum allowed length
 */
export declare const minLenNoSpace: {
    (min: number | Ref<number>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * @Rule Input must be a number or a date which satisfies the minimum provided value.
 * @param min Minimum allowed value
 */
export declare const minValue: {
    (min: number | Date | Ref<number | Date>): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

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
export declare const sameAs: {
    (compared: any | Ref<any>, lenient?: boolean): ValidationRule;
    skip: (..._args: any[]) => ValidationRule;
};

/**
 * @Rule Checks wether a string starts with the provided value
 * @param str The checked value
 * @param position At which character index should the matching begin
 */
export declare const startsWith: {
    (str: string | Ref<string>, position?: number): {
        _skip: boolean;
        validate: (value: any) => boolean;
        label: (value: any) => string;
    };
    skip: (..._args: any[]) => ValidationRule;
};

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
 * - `autoclear`: Boolean - clear
 */
export declare function useValidation<F extends Record<string, any>, R extends Partial<Record<keyof F, any>> | ComputedRef<Partial<Record<keyof F, any>>>>(form: F, rules: R, { proactive, autoclear }?: ValidationOptions): {
    reset: () => void;
    validate: (...rulesToOnlyValidate: string[]) => Promise<Record<keyof F, ValidationError>>;
    run: (...rulesToOnlyValidate: string[]) => Promise<Record<keyof F, ValidationError>>;
    addError: (key: keyof F, error: {
        errorKey: string;
        message: string;
    }) => Promise<void>;
    errors: UnwrapRef<Record<keyof F, ValidationError>>;
    $: {
        anyError: boolean;
        pending: boolean;
        errors: UnwrapRef<Record<keyof F, ValidationError>>;
        didValidate: boolean;
    };
};

declare interface ValidationError {
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
    _skip: boolean;
    validate: (arg: any) => Promise<boolean> | boolean;
    label: Label;
}

declare interface ValidationRuleObject extends ValidationRule {
    skip: () => void;
}

export { }
