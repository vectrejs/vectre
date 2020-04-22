import Vue from 'vue';
export default class Divider extends Vue {
    vert: boolean;
    content: string;
    get dataContent(): string | undefined;
}
