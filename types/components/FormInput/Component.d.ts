import * as tsx from 'vue-tsx-support';
export interface FormInputEvents {
    onInput: (value: any) => void;
}
export declare const FormInput: tsx.TsxComponent<import("vue").default, {} & {
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
    success?: boolean;
    value?: string | number;
    size?: "lg" | "sm";
    icon?: string;
    iconSide?: "left" | "right";
}, FormInputEvents, {}, {
    value: string | number;
    disabled: boolean;
    error: boolean;
    loading: boolean;
    success: boolean;
    icon: string;
    iconSide: "left" | "right";
    size: "lg" | "sm";
}>;
