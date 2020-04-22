import Vue from 'vue';
export default class Chip extends Vue {
    text: string;
    avatar: string;
    initials: string;
    active: boolean;
    small: boolean;
    private avatarSizes;
    get cssClass(): string[];
    close(): void;
    showClose(): boolean;
}
