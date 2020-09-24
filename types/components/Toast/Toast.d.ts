import * as tsx from 'vue-tsx-support';
import './styles.scss';
export declare const Toast: import("vue").VueConstructor<{
    _tsxattrs: tsx.TsxComponentAttrs<{} & {
        title?: string;
        type?: "error" | "success" | "primary" | "warning";
        icon?: "search" | "link" | "left" | "right" | "message" | "menu" | "time" | "stop" | "down" | "up" | "forward" | "hResize" | "vResize" | "plus" | "minus" | "cross" | "check" | "shutdown" | "refresh" | "flag" | "bookmark" | "edit" | "delete" | "share" | "download" | "upload" | "mail" | "people" | "photo" | "location" | "emoji" | "upward" | "downward" | "back" | "caret" | "apps" | "hMore" | "vMore";
        content?: string;
        autoclose?: string | number;
        closeable?: boolean;
    }, {}, {}>;
} & import("vue").default & {
    shown: boolean;
} & {
    close(): void;
    toggle(): void;
} & {
    title: string;
    content: string;
    type: "error" | "success" | "primary" | "warning";
    autoclose: string | number;
    closeable: boolean;
    icon: "search" | "link" | "left" | "right" | "message" | "menu" | "time" | "stop" | "down" | "up" | "forward" | "hResize" | "vResize" | "plus" | "minus" | "cross" | "check" | "shutdown" | "refresh" | "flag" | "bookmark" | "edit" | "delete" | "share" | "download" | "upload" | "mail" | "people" | "photo" | "location" | "emoji" | "upward" | "downward" | "back" | "caret" | "apps" | "hMore" | "vMore";
}>;
