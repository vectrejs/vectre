import vue from 'vue';
import { Size } from './Size';
export default class Modal extends vue {
    show: boolean;
    size: Size;
    private closeBtn;
    private overlay;
    private closeOverlay;
    private btnType;
    private get cssClass();
    close(): void;
}
