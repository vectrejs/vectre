import Vue from 'vue';
export default class extends Vue {
    gapless: boolean;
    oneline: boolean;
    get cssClass(): string[];
}
