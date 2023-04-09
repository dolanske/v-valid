import type { ComputedRef } from 'vue-demi';
import type { Error, ValidationOptions } from '../types';
export declare const emptyErrorObject: Error;
export declare function iterateIn(obj: Record<string, any>, callback: (key: string, value: any, path: string) => Promise<void> | void, path?: string): Promise<void>;
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
    validate: (...rulesToOnlyValidate: string[]) => Promise<Record<keyof F, Error>>;
    run: (...rulesToOnlyValidate: string[]) => Promise<Record<keyof F, Error>>;
    addError: (key: keyof F, error: {
        errorKey: string;
        message: string;
    }) => Promise<void>;
    errors: import("vue-demi").UnwrapRef<Record<keyof F, Error>>;
    $: {
        anyError: boolean;
        pending: boolean;
        errors: import("vue-demi").UnwrapRef<Record<keyof F, Error>>;
        didValidate: boolean;
    };
};
