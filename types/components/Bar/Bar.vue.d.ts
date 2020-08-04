import Vue from 'vue';
export default class Bar extends Vue {
    sm: boolean;
    min: number;
    max: number;
    value: number;
    tooltip: ((value: number) => string) | string | undefined;
    get dataTooltip(): string | undefined;
    get barCssClass(): string[];
    get barItemCssClass(): string[];
    get cssStyle(): Record<string, string | boolean | number>;
}
