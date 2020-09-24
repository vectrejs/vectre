import * as tsx from 'vue-tsx-support';
interface InputEvents {
    onInput: (event: any) => void;
}
export declare const Input: tsx.TsxComponent<import("vue").default, {} & {
    disabled?: boolean;
    error?: boolean;
    success?: boolean;
    value?: string | number;
    size?: "lg" | "sm";
}, InputEvents, {}, {
    size: "lg" | "sm";
    error: boolean;
    success: boolean;
    value: string | number;
    disabled: boolean;
}>;
export {};
