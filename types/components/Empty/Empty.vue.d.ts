import Vue from 'vue';
import { IconType } from '../Icon';
export default class Empty extends Vue {
    title: string;
    sub: string;
    icon: IconType;
    private iconSizes;
}
