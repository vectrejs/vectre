import * as tsx from 'vue-tsx-support';
interface InputEvents {
    onInput: (event: any) => void;
}
export declare const Input: tsx.TsxComponent<import("vue").default, {} & {
    size?: "sm" | "lg";
    error?: boolean;
    success?: boolean;
    value?: string | number;
    disabled?: boolean;
}, InputEvents, {}, {
    size: "sm" | "lg";
    error: boolean;
    success: boolean;
    value: string | number;
    disabled: boolean;
}>;
export {};
