import * as tsx from 'vue-tsx-support';
import { VNode, CreateElement } from 'vue';
import { Size } from './Size';
export interface RadioGroup {
    disabled?: boolean;
    error?: boolean;
    inline?: boolean;
    options?: any[] | {
        [label: string]: any;
    };
    name?: string;
    size?: Size;
    value?: any;
}
export declare class Group extends tsx.Component<RadioGroup> {
    options: any[] | {
        [label: string]: any;
    };
    name: string;
    value: any;
    inline: boolean;
    size: Size;
    error: boolean;
    disabled: boolean;
    render(h: CreateElement): VNode;
    private update;
    private get uid();
    private normalizeOptions;
}
