import { VNode, CreateElement } from 'vue';
import * as tsx from 'vue-tsx-support';
export interface OptionProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selected?: boolean;
}
export declare class Option extends tsx.Component<OptionProps> {
    disabled: boolean;
    value: string | number;
    label: string | number;
    selected: boolean;
    render(h: CreateElement): VNode;
}
