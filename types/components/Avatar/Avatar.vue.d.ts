import Vue from 'vue';
import { Size, Sizes } from './Size';
import { Presence } from './Presence';
export default class Avatar extends Vue {
    size: Size;
    src: string;
    initials: string;
    background: string;
    color: string;
    alt: string;
    presence: Presence;
    icon: string;
    get cssStyle(): {
        color: string;
        background: string;
    };
    get cssClass(): Sizes[];
}
