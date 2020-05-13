import Vue from 'vue';
import { Size } from './Size';
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
        [key: string]: string | undefined;
    };
    get cssClass(): string[];
}
