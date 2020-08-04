import * as tsx from 'vue-tsx-support';
export interface TextareaEvents {
    onInput: (value: any) => void;
}
export declare const Textarea: tsx.TsxComponent<object & Record<never, any> & {
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
}, TextareaEvents, {}, {
    listeners: {};
} & {
    onInput({ target: { value } }: any): void;
} & {
    placeholder: string;
} & {
    value: string;
    disabled: boolean;
}>;
