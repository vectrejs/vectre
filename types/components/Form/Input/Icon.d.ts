import { VueComponent } from 'vue-tsx-helper';
import { VNode, CreateElement } from 'vue';
interface IconProps {
    icon: string;
}
export declare class Icon extends VueComponent<IconProps> {
    icon: string;
    render(h: CreateElement): VNode;
}
export {};
