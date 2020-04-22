import { PluginFunction } from 'vue';
export interface IPluginOptions {
    prefix?: string;
}
declare const _default: PluginFunction<IPluginOptions> & {
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
        FormCheckbox: typeof import("./components").FormCheckbox;
        FormCheckboxGroup: typeof import("./components").FormCheckboxGroup;
        FormGroup: typeof import("./components").FormGroup;
        FormInput: import("vue/types/vue").ExtendedVue<import("vue").default, unknown, {
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
        FormLabel: import("vue").VueConstructor<import("vue").default>;
        FormHint: import("vue").VueConstructor<import("vue").default>;
        FormHorizontal: import("vue").VueConstructor<import("vue").default>;
        FormOption: typeof import("./components").FormOption;
        FormSelect: typeof import("./components").FormSelect;
        FormTextarea: import("vue").VueConstructor<import("vue").default>;
        FormRadioGroup: typeof import("./components").FormRadioGroup;
        FormRadio: typeof import("./components").FormRadio;
    };
    layout: {
        Container: import("vue").VueConstructor<import("vue").default>;
        Columns: import("vue").VueConstructor<import("vue").default>;
        Column: import("vue").VueConstructor<import("vue").default>;
    };
    directives: {
        Badge: import("vue").DirectiveFunction;
        Loading: import("vue").DirectiveFunction;
        Tooltip: import("vue").DirectiveFunction;
    };
};
export default _default;
