import type { Ref } from 'vue-demi';
/**
 * @Rule Checks wether a string starts with the provided value
 * @param str The checked value
 * @param position At which character index should the matching begin
 */
declare const startsWith: {
    (str: string | Ref<string>, position?: number): {
        _skip: boolean;
        validate: (value: any) => boolean;
        label: (value: any) => string;
    };
    skip: (..._args: any[]) => import("../../types").ValidationRule;
};
export { startsWith, };
