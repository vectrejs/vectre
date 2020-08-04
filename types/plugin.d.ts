import { PluginFunction } from 'vue';
export interface PluginOptions {
    prefix?: string;
}
declare const _default: PluginFunction<PluginOptions> & {
    components: {
        Avatar: import("vue").VueConstructor<import("vue").default>;
        Accordion: import("vue").VueConstructor<import("vue").default>;
        Bar: import("vue").VueConstructor<import("vue").default>;
        Breadcrumb: import("vue").VueConstructor<import("vue").default>;
        Btn: import("vue").VueConstructor<import("vue").default>;
        BtnGroup: import("vue").VueConstructor<import("vue").default>;
        Card: import("vue").VueConstructor<import("vue").default>;
        Chip: import("vue").VueConstructor<import("vue").default>;
        Divider: import("vue").VueConstructor<import("vue").default>;
        DropdownMenu: import("vue").VueConstructor<import("vue").default>;
        Empty: import("vue").VueConstructor<import("vue").default>;
        Icon: import("vue").VueConstructor<import("vue").default>;
        Modal: import("vue").VueConstructor<import("vue").default>;
        OffCanvas: import("vue").VueConstructor<import("vue").default>;
        Pagination: import("vue").VueConstructor<import("vue").default>;
        Panel: import("vue").VueConstructor<import("vue").default>;
        Popover: import("vue/types/vue").ExtendedVue<import("vue").default, unknown, unknown, unknown, {
            side: string;
        }>;
        Step: import("vue").VueConstructor<import("vue").default>;
        Steps: import("vue/types/vue").ExtendedVue<import("vue").default, unknown, unknown, unknown, {
            active: number;
        }>;
        Tab: import("vue").VueConstructor<import("vue").default>;
        Tabs: import("vue/types/vue").ExtendedVue<import("vue").default, unknown, unknown, unknown, {
            current: string | number;
            items: string[];
            block: boolean;
        }>;
        Tile: import("vue").VueConstructor<import("vue").default>;
        Toast: import("vue").VueConstructor<import("vue").default>;
        Tag: import("vue").VueConstructor<import("vue").default>;
        Navigation: import("vue").VueConstructor<import("vue").default>;
        VerticalMenu: import("vue").VueConstructor<import("vue").default>;
        FormCheckbox: import("vue-tsx-support").TsxComponent<import("vue/types/vue").CombinedVueInstance<{
            __listeners: ((data: string) => void)[];
        } & Record<string, unknown> & {
            __listeners: () => any;
        } & import("vue").default, object, object, object, Record<never, any>>, {} & {
            checked?: boolean;
            disabled?: boolean;
            inline?: boolean;
            label?: string | number;
            model?: unknown;
            value?: unknown;
            size?: string;
            type?: string;
            error?: boolean;
        }, import("./components/Form/Checkbox/Checkbox").CheckboxEvents, {}, {
            onChange({ target: { checked } }: any): void;
        } & {
            _checked: boolean;
        } & {
            checked: boolean;
            disabled: boolean;
            inline: boolean;
            label: string | number;
            model: unknown;
            value: unknown;
            size: string;
            type: string;
            error: boolean;
        }>;
        FormCheckboxGroup: typeof import("./components").FormCheckboxGroup;
        FormGroup: import("vue-tsx-support").TsxComponent<import("vue").default, unknown, {}, {}, {}>;
        FormInput: import("vue-tsx-support").TsxComponent<object & Record<never, any> & {
            __attrs: ((data: string) => void)[];
        } & Record<string, unknown> & {
            __attrs: () => any;
        } & import("vue").default & {
            __listeners: ((data: string) => void)[];
        } & {
            __listeners: () => any;
        }, {} & {
            disabled?: boolean;
            value?: string | number;
            size?: string;
            error?: boolean;
            loading?: boolean;
            success?: boolean;
            icon?: string;
            iconSide?: string;
        }, import("./components/Form/Input/Component").InputEvents, {}, {
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
        FormLabel: import("vue-tsx-support").TsxComponent<import("vue").default, unknown, {}, {}, {}>;
        FormHint: import("vue-tsx-support").TsxComponent<import("vue").default, unknown, {}, {}, {}>;
        FormHorizontal: import("vue-tsx-support").TsxComponent<import("vue").default, unknown, {}, {}, {}>;
        FormOption: typeof import("./components").FormOption;
        FormSelect: import("vue-tsx-support").TsxComponent<object & Record<never, any> & {
            __attrs: ((data: string) => void)[];
        } & Record<string, unknown> & {
            __attrs: () => any;
        } & import("vue").default & {
            __listeners: ((data: string) => void)[];
        } & {
            __listeners: () => any;
        }, {} & {
            disabled?: boolean;
            value?: string | number | string[] | number[];
            size?: string | number;
            error?: boolean;
            success?: boolean;
            options?: string[] | {
                [label: string]: string;
            };
            multiple?: boolean;
            placeholder?: string;
            scale?: "sm" | "lg";
        }, import("./components/Form/Select/Select").SelectEvent, {}, {
            onInput({ target: { selectedOptions } }: import("./components/Form/Select/Select").InputEvent): void;
            isSelected(label: string | number, value: string | number, current?: string | number | string[] | number[]): boolean;
            normalizeOptions(options: string[] | {
                [label: string]: any;
            }): import("./components/Form/Select/Select").NormalizedOption[];
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
        FormTextarea: import("vue-tsx-support").TsxComponent<object & Record<never, any> & {
            __attrs: ((data: string) => void)[];
        } & Record<string, unknown> & {
            __attrs: () => any;
        } & import("vue").default & {
            __listeners: ((data: string) => void)[];
        } & {
            __listeners: () => any;
        }, {} & {
            disabled?: boolean;
            value?: string;
        }, import("./components/Form/Textarea/Textarea").TextareaEvents, {}, {
            listeners: {};
        } & {
            onInput({ target: { value } }: any): void;
        } & {
            placeholder: string;
        } & {
            value: string;
            disabled: boolean;
        }>;
        FormRadioGroup: typeof import("./components").FormRadioGroup;
        FormRadio: import("vue-tsx-support").TsxComponent<import("vue/types/vue").CombinedVueInstance<{
            __listeners: ((data: string) => void)[];
        } & Record<string, unknown> & {
            __listeners: () => any;
        } & import("vue").default, object, object, object, Record<never, any>>, {} & {
            checked?: boolean;
            disabled?: boolean;
            inline?: boolean;
            label?: string;
            model?: unknown;
            value?: unknown;
            size?: "sm" | "lg";
            error?: boolean;
            name?: string;
        }, import("./components/Form/Radio/Radio").RadioEvents, {}, {
            onChecked(): void;
        } & {
            _label: any;
            _value: any;
        } & {
            checked: boolean;
            disabled: boolean;
            error: boolean;
            inline: boolean;
            label: string;
            name: string;
            size: "sm" | "lg";
            value: unknown;
            model: unknown;
        }>;
    };
    layout: {
        Container: import("vue-tsx-support").TsxComponent<import("vue").default, unknown, {}, {}, {}>;
        Columns: import("vue-tsx-support").TsxComponent<import("vue").default, unknown, {}, {}, {}>;
        Column: import("vue-tsx-support").TsxComponent<import("vue").default, unknown, {}, {}, {}>;
    };
    directives: {
        Badge: import("vue").DirectiveFunction;
        Loading: import("vue").DirectiveFunction;
        Tooltip: import("vue").DirectiveFunction;
    };
};
export default _default;
