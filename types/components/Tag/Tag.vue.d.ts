import Vue from 'vue';
import { Type } from './Type';
export default class Label extends Vue {
    type: Type;
    rounded: boolean;
    get cssClass(): string[];
}
