import * as tsx from 'vue-tsx-support';
import { VNode, CreateElement } from 'vue';
import { FormRadioSize } from './Size';
export interface FormRadioGroupProps {
    disabled?: boolean;
    error?: boolean;
    inline?: boolean;
    options?: any[] | {
        [label: string]: any;
    };
    name?: string;
    size?: FormRadioSize;
    value?: any;
}
export declare class FormRadioGroup extends tsx.Component<FormRadioGroupProps> {
    options: any[] | {
        [label: string]: any;
    };
    name: string;
    value: any;
    inline: boolean;
    size: FormRadioSize;
    error: boolean;
    disabled: boolean;
    render(h: CreateElement): VNode;
    private update;
    private get uid();
    private normalizeOptions;
}
