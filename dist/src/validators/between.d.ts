import type { Ref } from 'vue-demi';
/**
 * @Rule Checks if value is between the provided range
 * @param min Minimum value
 * @param max Maximum value
 */
declare const between: {
    (min: number | Date | Ref<number | Date>, max: number | Date | Ref<number | Date>): {
        _skip: boolean;
        validate: (value: any) => boolean;
        label: () => string;
    };
    skip: (..._args: any[]) => import("../types").ValidationRule;
};
export { between };
