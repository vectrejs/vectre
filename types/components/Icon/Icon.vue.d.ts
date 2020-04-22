import vue from 'vue';
export default class Icon extends vue {
    type: string;
    size: string;
    get cssStyle(): object;
    get cssClass(): string[];
}
