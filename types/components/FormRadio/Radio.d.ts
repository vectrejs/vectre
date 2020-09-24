import * as tsx from 'vue-tsx-support';
export interface FormRadioEvents {
    onChange: (value: any) => void;
}
export declare const FormRadio: tsx.TsxComponent<import("vue/types/vue").CombinedVueInstance<{
    __listeners: ((data: string) => void)[];
} & Record<string, unknown> & {
    __listeners: () => any;
} & import("vue").default, object, object, object, Record<never, any>>, {} & {
    disabled?: boolean;
    error?: boolean;
    label?: string;
    name?: string;
    value?: unknown;
    size?: "lg" | "sm";
    checked?: boolean;
    inline?: boolean;
    model?: unknown;
}, FormRadioEvents, {}, {
    onChecked(): void;
} & {
    _label: any;
    _value: any;
} & {
    checked: boolean;
    disabled: boolean;
    error: boolean;
    inline: boolean;
    label: string;
    name: string;
    size: "lg" | "sm";
    value: unknown;
    model: unknown;
}>;
