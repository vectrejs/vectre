import { VNode, CreateElement } from 'vue';
import { FormCheckboxType } from './Type';
import { FormCheckboxSize } from './Size';
import * as tsx from 'vue-tsx-support';
interface FormCheckboxGroupProps {
    disabled?: boolean;
    inline?: boolean;
    options?: any[] | {
        [label: string]: any;
    };
    size?: FormCheckboxSize;
    type: FormCheckboxType;
    value?: any[];
}
export declare class FormCheckboxGroup extends tsx.Component<FormCheckboxGroupProps> {
    options?: any[] | {
        [label: string]: any;
    };
    value: any[];
    inline: boolean;
    type: FormCheckboxType;
    size: FormCheckboxSize;
    disabled: boolean;
    error: boolean;
    render(h: CreateElement): VNode;
    private update;
    private normalizeOptions;
}
export {};
