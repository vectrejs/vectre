import { VueComponent } from 'vue-tsx-helper';
import { VNode, CreateElement } from 'vue';
export interface IOptionProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selected?: boolean;
}
export declare class Option extends VueComponent<IOptionProps> {
    disabled: boolean;
    value: string | number;
    label: string | number;
    selected: boolean;
    render(h: CreateElement): VNode;
}
