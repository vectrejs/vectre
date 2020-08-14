import * as tsx from 'vue-tsx-support';
export interface FormInputEvents {
    onInput: (value: any) => void;
}
export declare const FormInput: tsx.TsxComponent<object & Record<never, any> & {
    __attrs: ((data: string) => void)[];
} & Record<string, unknown> & {
    __attrs: () => any;
} & import("vue").default & {
    __listeners: ((data: string) => void)[];
} & {
    __listeners: () => any;
}, {} & {
    value?: string | number;
    error?: boolean;
    loading?: boolean;
    success?: boolean;
    icon?: string;
    disabled?: boolean;
    iconSide?: string;
    size?: string;
}, FormInputEvents, {}, {
    onInput({ target: { value } }: {
        target: {
            value: string;
        };
    }): void;
} & {
    value: string | number;
    error: boolean;
    loading: boolean;
    success: boolean;
    icon: string;
    disabled: boolean;
    iconSide: string;
    size: string;
}>;
