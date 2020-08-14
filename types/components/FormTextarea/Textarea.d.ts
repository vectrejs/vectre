import vue from 'vue';
export interface FormTextareaEvents {
    onInput: (value: any) => void;
}
export declare const FormTextarea: import("vue/types/vue").ExtendedVue<vue, {
    listeners: {};
}, {
    onInput({ target: { value } }: any): void;
}, {
    placeholder: string;
}, {
    value: string;
    disabled: boolean;
}>;
