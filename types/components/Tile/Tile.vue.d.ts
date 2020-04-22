import vue from 'vue';
import { IconType } from '../Icon';
export default class Tile extends vue {
    title: string;
    subtitle: string;
    avatar: string;
    initials: string;
    icon: IconType;
    compact: boolean;
    private iconSize;
    private avatarSize;
}
