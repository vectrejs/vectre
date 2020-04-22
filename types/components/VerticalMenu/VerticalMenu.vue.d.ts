import vue from 'vue';
export default class VerticalMenu extends vue {
    items: object[];
    active: string | number;
    protected normalizeDivider(divider: string | boolean): string;
    protected cssClassLinkItem(current: string | number): string[];
}
