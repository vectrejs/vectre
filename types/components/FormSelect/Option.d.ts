import * as tsx from 'vue-tsx-support';
export interface FormSelectOptionProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selected?: boolean;
}
export declare const FormSelectOption: tsx.TsxComponent<object & Record<never, any> & {
    __attrs: ((data: string) => void)[];
} & Record<string, unknown> & {
    __attrs: () => any;
} & import("vue").default & {
    __listeners: ((data: string) => void)[];
} & {
    __listeners: () => any;
}, {} & {
    disabled?: boolean;
    value?: string | number;
    label?: string | number;
    selected?: boolean;
}, {}, {}, {
    disabled: boolean;
    value: string | number;
    label: string | number;
    selected: boolean;
}>;
