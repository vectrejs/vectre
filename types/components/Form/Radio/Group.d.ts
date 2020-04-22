import { VueComponent } from 'vue-tsx-helper';
import { VNode, CreateElement } from 'vue';
import { Size } from './Size';
export interface IRadioGroup {
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
export declare class Group extends VueComponent<IRadioGroup> {
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
