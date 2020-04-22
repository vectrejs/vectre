import vue from 'vue';
export declare const Component: import("vue/types/vue").ExtendedVue<vue, unknown, {
    onInput({ target: { value } }: {
        target: {
            value: string;
        };
    }): void;
}, unknown, {
    value: string | number;
    error: boolean;
    loading: boolean;
    success: boolean;
    icon: string;
    disabled: boolean;
    iconSide: string;
    size: string;
}>;
