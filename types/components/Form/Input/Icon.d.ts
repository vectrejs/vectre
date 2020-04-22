import { VueComponent } from 'vue-tsx-helper';
import { VNode, CreateElement } from 'vue';
interface IIconProps {
    icon: string;
}
export declare class Icon extends VueComponent<IIconProps> {
    icon: string;
    render(h: CreateElement): VNode;
}
export {};
