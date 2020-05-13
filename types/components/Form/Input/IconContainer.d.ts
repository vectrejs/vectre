import { VueComponent } from 'vue-tsx-helper';
import { VNode, CreateElement } from 'vue';
export declare enum IconSide {
    left = "has-icon-left",
    right = "has-icon-right"
}
declare type IconSides = keyof typeof IconSide;
interface Props {
    side: IconSides;
}
export declare class IconContainer extends VueComponent<Props> {
    side: IconSides;
    render(h: CreateElement): VNode;
}
export {};
