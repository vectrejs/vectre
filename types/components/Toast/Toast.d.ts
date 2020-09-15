import * as tsx from 'vue-tsx-support';
import './styles.scss';
export declare const Toast: import("vue").VueConstructor<{
    _tsxattrs: tsx.TsxComponentAttrs<{} & {
        title?: string;
        content?: string;
        type?: "primary" | "success" | "warning" | "error";
        autoclose?: string | number;
        closeable?: boolean;
        icon?: "hResize" | "vResize" | "plus" | "minus" | "cross" | "check" | "stop" | "shutdown" | "refresh" | "search" | "flag" | "bookmark" | "edit" | "delete" | "share" | "download" | "upload" | "mail" | "people" | "message" | "photo" | "time" | "location" | "link" | "emoji" | "up" | "down" | "right" | "left" | "upward" | "forward" | "downward" | "back" | "caret" | "menu" | "apps" | "hMore" | "vMore";
    }, {}, {}>;
} & import("vue").default & {
    shown: boolean;
} & {
    close(): void;
    toggle(): void;
} & {
    title: string;
    content: string;
    type: "primary" | "success" | "warning" | "error";
    autoclose: string | number;
    closeable: boolean;
    icon: "hResize" | "vResize" | "plus" | "minus" | "cross" | "check" | "stop" | "shutdown" | "refresh" | "search" | "flag" | "bookmark" | "edit" | "delete" | "share" | "download" | "upload" | "mail" | "people" | "message" | "photo" | "time" | "location" | "link" | "emoji" | "up" | "down" | "right" | "left" | "upward" | "forward" | "downward" | "back" | "caret" | "menu" | "apps" | "hMore" | "vMore";
}>;
