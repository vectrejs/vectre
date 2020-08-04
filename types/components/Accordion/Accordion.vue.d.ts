import Vue from 'vue';
import { IconType } from '../Icon';
export default class Accordion extends Vue {
    items: Record<string, unknown>[] | Record<string, unknown>;
    checked: string | number | string[] | number[];
    name: string;
    multiple: boolean;
    icon: IconType;
    get type(): string;
    private uid;
    private isSelected;
    private check;
    private get id();
}
