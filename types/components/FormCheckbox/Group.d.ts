import * as tsx from 'vue-tsx-support';
import { FormCheckboxEvents } from './Event';
export declare const FormCheckboxGroup: tsx.TsxComponent<import("vue/types/vue").CombinedVueInstance<{
    __listeners: ((data: string) => void)[];
} & Record<string, unknown> & {
    __listeners: () => any;
} & import("vue").default, object, object, object, Record<never, any>>, {} & {
    options?: string[] | {
        [label: string]: string;
    };
    value?: any;
    type?: "switch" | "checkbox";
    size?: "sm" | "lg";
    inline?: boolean;
    disabled?: boolean;
    error?: boolean;
}, FormCheckboxEvents, {}, {
    onChange(value: unknown): void;
} & {
    options: string[] | {
        [label: string]: string;
    };
    value: any;
    type: "switch" | "checkbox";
    size: "sm" | "lg";
    inline: boolean;
    disabled: boolean;
    error: boolean;
}>;
