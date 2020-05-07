import { VueComponent } from 'vue-tsx-helper';
import { Type } from './Type';
import { Size } from './Size';
import { CreateElement, VNode } from 'vue';
export interface ICheckboxProps {
    checked?: boolean;
    disabled?: boolean;
    inline?: boolean;
    label?: string | number;
    model?: any;
    type?: Type;
    value?: any;
    size?: Size;
    error?: boolean;
}
export default class Checkbox extends VueComponent<ICheckboxProps> {
    label: string | number;
    checked: boolean;
    value: any;
    disabled: boolean;
    type: Type;
    inline: boolean;
    size: Size;
    error: boolean;
    protected model: any;
    render(h: CreateElement): VNode;
    onChange({ target: { checked } }: any): this | undefined;
    private get _checked();
}