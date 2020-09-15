import * as tsx from 'vue-tsx-support';
export interface FormInputEvents {
    onInput: (value: any) => void;
}
export declare const FormInput: tsx.TsxComponent<import("vue").default, {} & {
    value?: string | number;
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
    success?: boolean;
    icon?: string;
    iconSide?: "left" | "right";
    size?: "sm" | "lg";
}, FormInputEvents, {}, {
    value: string | number;
    disabled: boolean;
    error: boolean;
    loading: boolean;
    success: boolean;
    icon: string;
    iconSide: "left" | "right";
    size: "sm" | "lg";
}>;
