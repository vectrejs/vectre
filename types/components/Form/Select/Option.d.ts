import { VueComponent } from 'vue-tsx-helper';
import { VNode, CreateElement } from 'vue';
export interface OptionProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selected?: boolean;
}
export declare class Option extends VueComponent<OptionProps> {
    disabled: boolean;
    value: string | number;
    label: string | number;
    selected: boolean;
    render(h: CreateElement): VNode;
}
