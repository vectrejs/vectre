import vue from 'vue';
export default class Icon extends vue {
    type: string;
    size: string;
    get cssStyle(): Record<string, string | number | boolean>;
    get cssClass(): string[];
}
