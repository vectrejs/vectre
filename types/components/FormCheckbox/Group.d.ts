import * as tsx from 'vue-tsx-support';
import { FormCheckboxEvents } from './Event';
export declare const FormCheckboxGroup: tsx.TsxComponent<import("vue/types/vue").CombinedVueInstance<{
    __listeners: ((data: string) => void)[];
} & Record<string, unknown> & {
    __listeners: () => any;
} & import("vue").default, object, object, object, Record<never, any>>, {} & {
    disabled?: boolean;
    error?: boolean;
    type?: "switch" | "checkbox";
    value?: any;
    size?: "lg" | "sm";
    inline?: boolean;
    options?: string[] | {
        [label: string]: string;
    };
}, FormCheckboxEvents, {}, {
    onChange(value: any): void;
} & {
    options: string[] | {
        [label: string]: string;
    };
    value: any;
    type: "switch" | "checkbox";
    size: "lg" | "sm";
    inline: boolean;
    disabled: boolean;
    error: boolean;
}>;
