import type { ComputedRef } from 'vue-demi';
import type { Error, Errors, ValidationOptions } from '../types';
export declare const emptyErrorObject: Error;
export declare function iterateIn(obj: Record<string, any>, callback: (key: string, value: any, path: string) => Promise<void> | void, path?: string): Promise<void>;
export declare function useValidation(form: Record<string, any>, rules: ComputedRef<Record<string, any>> | Record<string, any>, { proactive, autoclear }?: ValidationOptions): {
    reset: () => void;
    validate: (...validateOnly: string[]) => Promise<Errors>;
    root: any;
    errors: any;
    run: (...validateOnly: string[]) => Promise<Errors>;
};
