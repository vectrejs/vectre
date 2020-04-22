import { VueComponent } from 'vue-tsx-helper';
import { VNode, CreateElement } from 'vue';
import { Type } from './Type';
import { Size } from './Size';
interface ICheckboxGroup {
    disabled?: boolean;
    inline?: boolean;
    options?: any[] | {
        [label: string]: any;
    };
    size?: Size;
    type: Type;
    value?: any[];
}
export declare class Group extends VueComponent<ICheckboxGroup> {
    options?: any[] | {
        [label: string]: any;
    };
    value: any[];
    inline: boolean;
    type: Type;
    size: Size;
    disabled: boolean;
    error: boolean;
    render(h: CreateElement): VNode;
    private update;
    private normalizeOptions;
}
export {};
