import * as tsx from 'vue-tsx-support';
import { ModalEvents } from './Events';
export declare const Modal: tsx.TsxComponent<import("vue").default, {} & {
    show?: boolean;
    size?: "sm" | "lg";
    overlay?: boolean;
    closeBtn?: boolean;
    closeOverlay?: boolean;
}, ModalEvents, {}, {
    show: boolean;
    size: "sm" | "lg";
    overlay: boolean;
    closeBtn: boolean;
    closeOverlay: boolean;
}>;
