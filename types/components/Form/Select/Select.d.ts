import { VNode, CreateElement } from 'vue';
import { VueComponent } from 'vue-tsx-helper';
import { Size } from './Size';
import { SelectHTMLAttributes } from 'vue-tsx-helper/lib/dom';
interface Props extends SelectHTMLAttributes {
    options?: {
        [label: string]: string;
    } | string[];
    multiple?: boolean;
    placeholder?: string;
    value?: string | string[];
    scale?: Size;
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
}
export interface NormalizedOption {
    label: string;
    value: any;
}
export declare class Select extends VueComponent<Props> {
    options: {
        [label: string]: any;
    } | string[];
    value: string | string[];
    multiple: boolean;
    placeholder: string;
    scale: Size;
    error: boolean;
    success: boolean;
    disabled: boolean;
    mounted(): void;
    render(h: CreateElement): VNode;
    private get listeners();
    private onInput;
    private isSelected;
    private normalizeOptions;
}
export {};
