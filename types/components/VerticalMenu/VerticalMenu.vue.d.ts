import vue from 'vue';
export default class VerticalMenu extends vue {
    items: Record<string, unknown>[];
    active: string | number;
    protected normalizeDivider(divider: string | boolean): string;
    protected cssClassLinkItem(current: string | number): string[];
}
