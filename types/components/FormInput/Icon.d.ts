import { Component as TsxComponent } from 'vue-tsx-support';
import { VNode, CreateElement } from 'vue';
interface IconProps {
    icon: string;
}
export declare class Icon extends TsxComponent<IconProps> {
    icon: string;
    render(h: CreateElement): VNode;
}
export {};
