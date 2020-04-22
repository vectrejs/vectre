import Vue from 'vue';
import { Grid } from './Grid';
export default class extends Vue {
    grid: Grid;
    get cssClass(): string[];
}
