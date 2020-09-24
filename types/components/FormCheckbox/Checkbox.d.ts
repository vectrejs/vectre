import * as tsx from 'vue-tsx-support';
import { FormCheckboxEvents } from './Event';
export declare const FormCheckbox: tsx.TsxComponent<import("vue/types/vue").CombinedVueInstance<{
    __listeners: ((data: string) => void)[];
} & Record<string, unknown> & {
    __listeners: () => any;
} & import("vue").default, object, object, object, Record<never, any>>, {} & {
    disabled?: boolean;
    error?: boolean;
    label?: string | number;
    type?: "switch" | "checkbox";
    value?: unknown;
    size?: "lg" | "sm";
    checked?: boolean;
    inline?: boolean;
    model?: unknown;
}, FormCheckboxEvents, {}, {
    onChange({ target: { checked } }: any): void;
} & {
    _checked: boolean;
} & {
    checked: boolean;
    disabled: boolean;
    inline: boolean;
    label: string | number;
    model: unknown;
    value: unknown;
    size: "lg" | "sm";
    type: "switch" | "checkbox";
    error: boolean;
}>;
