import * as tsx from 'vue-tsx-support';
export interface FormCheckboxEvents {
    onChange: (value: any) => void;
}
export declare const FormCheckbox: tsx.TsxComponent<import("vue/types/vue").CombinedVueInstance<{
    __listeners: ((data: string) => void)[];
} & Record<string, unknown> & {
    __listeners: () => any;
} & import("vue").default, object, object, object, Record<never, any>>, {} & {
    checked?: boolean;
    disabled?: boolean;
    inline?: boolean;
    label?: string | number;
    model?: unknown;
    value?: unknown;
    size?: string;
    type?: string;
    error?: boolean;
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
    size: string;
    type: string;
    error: boolean;
}>;
