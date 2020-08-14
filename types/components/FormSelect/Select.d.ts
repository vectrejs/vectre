import * as tsx from 'vue-tsx-support';
export interface InputEvent {
    target: {
        value: string;
        selectedOptions: HTMLCollectionOf<HTMLOptionElement>;
    };
}
export interface NormalizedOption {
    label: string;
    value: any;
}
export interface FormSelectEvents {
    onInput: (value: string | string[] | number | number[]) => void;
}
export declare const FormSelect: tsx.TsxComponent<object & Record<never, any> & {
    __attrs: ((data: string) => void)[];
} & Record<string, unknown> & {
    __attrs: () => any;
} & import("vue").default & {
    __listeners: ((data: string) => void)[];
} & {
    __listeners: () => any;
}, {} & {
    options?: string[] | {
        [label: string]: string;
    };
    multiple?: boolean;
    placeholder?: string;
    value?: string | number | string[] | number[];
    size?: string | number;
    scale?: "sm" | "lg";
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
}, FormSelectEvents, {}, {
    onInput({ target: { selectedOptions } }: InputEvent): void;
    isSelected(label: string | number, value: string | number, current?: string | number | string[] | number[]): boolean;
    normalizeOptions(options: string[] | {
        [label: string]: any;
    }): NormalizedOption[];
} & {
    options: string[] | {
        [label: string]: string;
    };
    multiple: boolean;
    placeholder: string;
    value: string | number | string[] | number[];
    size: string | number;
    scale: "sm" | "lg";
    error: boolean;
    success: boolean;
    disabled: boolean;
}>;
