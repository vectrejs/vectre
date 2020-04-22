import Vue from 'vue';
export default class extends Vue {
    ml: boolean;
    mx: boolean;
    mr: boolean;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    col: number;
    hide: number;
    show: number;
    get cssClass(): string[];
}
