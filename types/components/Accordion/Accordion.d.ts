import * as tsx from 'vue-tsx-support';
import { AccordionEvents } from './Event';
export declare const Accordion: tsx.TsxComponent<import("vue").default, {
    items: string[] | Record<string | number, string>;
} & {
    name?: string;
    icon?: "search" | "link" | "left" | "right" | "message" | "menu" | "time" | "stop" | "down" | "up" | "forward" | "hResize" | "vResize" | "plus" | "minus" | "cross" | "check" | "shutdown" | "refresh" | "flag" | "bookmark" | "edit" | "delete" | "share" | "download" | "upload" | "mail" | "people" | "photo" | "location" | "emoji" | "upward" | "downward" | "back" | "caret" | "apps" | "hMore" | "vMore";
    checked?: string | number | unknown[];
    multiple?: boolean;
}, AccordionEvents, {}, {
    isChecked(key: string, index: number): boolean;
    toggle(event: Event, key: string, index: number): void;
} & {
    $_name: string;
} & {
    items: string[] | Record<string | number, string>;
    checked: string | number | unknown[];
    name: string;
    multiple: boolean;
    icon: "search" | "link" | "left" | "right" | "message" | "menu" | "time" | "stop" | "down" | "up" | "forward" | "hResize" | "vResize" | "plus" | "minus" | "cross" | "check" | "shutdown" | "refresh" | "flag" | "bookmark" | "edit" | "delete" | "share" | "download" | "upload" | "mail" | "people" | "photo" | "location" | "emoji" | "upward" | "downward" | "back" | "caret" | "apps" | "hMore" | "vMore";
}>;
