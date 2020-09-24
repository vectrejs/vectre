import * as tsx from 'vue-tsx-support';
import { ModalEvents } from './Events';
export declare const Modal: tsx.TsxComponent<import("vue").default, {} & {
    show?: boolean;
    size?: "lg" | "sm";
    overlay?: boolean;
    closeBtn?: boolean;
    closeOverlay?: boolean;
}, ModalEvents, {}, {
    show: boolean;
    size: "lg" | "sm";
    overlay: boolean;
    closeBtn: boolean;
    closeOverlay: boolean;
}>;
