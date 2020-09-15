import * as tsx from 'vue-tsx-support';
import { AccordionEvents } from './Event';
export declare const Accordion: tsx.TsxComponent<import("vue").default, {
    items: Record<string | number, string> | string[];
} & {
    checked?: string | number | unknown[];
    name?: string;
    multiple?: boolean;
    icon?: "hResize" | "vResize" | "plus" | "minus" | "cross" | "check" | "stop" | "shutdown" | "refresh" | "search" | "flag" | "bookmark" | "edit" | "delete" | "share" | "download" | "upload" | "mail" | "people" | "message" | "photo" | "time" | "location" | "link" | "emoji" | "up" | "down" | "right" | "left" | "upward" | "forward" | "downward" | "back" | "caret" | "menu" | "apps" | "hMore" | "vMore";
}, AccordionEvents, {}, {
    isChecked(key: string, index: number): boolean;
    toggle(event: Event, key: string, index: number): void;
} & {
    $_name: string;
} & {
    items: Record<string | number, string> | string[];
    checked: string | number | unknown[];
    name: string;
    multiple: boolean;
    icon: "hResize" | "vResize" | "plus" | "minus" | "cross" | "check" | "stop" | "shutdown" | "refresh" | "search" | "flag" | "bookmark" | "edit" | "delete" | "share" | "download" | "upload" | "mail" | "people" | "message" | "photo" | "time" | "location" | "link" | "emoji" | "up" | "down" | "right" | "left" | "upward" | "forward" | "downward" | "back" | "caret" | "menu" | "apps" | "hMore" | "vMore";
}>;
