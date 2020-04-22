import { VueComponent } from 'vue-tsx-helper';
import { VNode, CreateElement } from 'vue';
declare type IconSides = keyof typeof IconSide;
export declare enum IconSide {
    left = "has-icon-left",
    right = "has-icon-right"
}
interface IProps {
    side: IconSides;
}
export declare class IconContainer extends VueComponent<IProps> {
    side: IconSides;
    render(h: CreateElement): VNode;
}
export {};
