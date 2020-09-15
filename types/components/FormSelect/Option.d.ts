import * as tsx from 'vue-tsx-support';
export interface FormSelectOptionProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selected?: boolean;
}
export declare const FormSelectOption: tsx.TsxComponent<import("vue").default, {} & {
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
