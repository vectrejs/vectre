import { IconType } from '../Icon';
import vue from 'vue';
export default class OffCanvas extends vue {
    icon: IconType;
    sidebarShow: boolean;
    private active;
    showSidebar(): void;
    hideSidebar(): void;
}
