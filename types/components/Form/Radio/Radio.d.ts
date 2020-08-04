import * as tsx from 'vue-tsx-support';
export interface RadioEvents {
    onChange: (value: any) => void;
}
export declare const Radio: tsx.TsxComponent<import("vue/types/vue").CombinedVueInstance<{
    __listeners: ((data: string) => void)[];
} & Record<string, unknown> & {
    __listeners: () => any;
} & import("vue").default, object, object, object, Record<never, any>>, {} & {
    model?: unknown;
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    inline?: boolean;
    label?: string;
    name?: string;
    size?: "sm" | "lg";
    value?: unknown;
}, RadioEvents, {}, {
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
    size: "sm" | "lg";
    value: unknown;
    model: unknown;
}>;
