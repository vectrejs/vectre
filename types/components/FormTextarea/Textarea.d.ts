import * as tsx from 'vue-tsx-support';
export interface FormTextareaEvents {
    onInput: (value: any) => void;
}
export declare const FormTextarea: tsx.TsxComponent<object & Record<never, any> & {
    __attrs: ((data: string) => void)[];
} & Record<string, unknown> & {
    __attrs: () => any;
} & import("vue").default & {
    __listeners: ((data: string) => void)[];
} & {
    __listeners: () => any;
}, {} & {
    value?: string;
    disabled?: boolean;
}, FormTextareaEvents, {}, {
    onInput({ target: { value } }: any): void;
} & {
    placeholder: string;
} & {
    value: string;
    disabled: boolean;
}>;
