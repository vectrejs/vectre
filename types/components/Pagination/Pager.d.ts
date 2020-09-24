import * as tsx from 'vue-tsx-support';
import { PaginationEvents } from './Events';
export declare type PagerItem = number | string;
export declare const Pager: tsx.TsxComponent<import("vue").default, {
    pages: number;
} & {
    show?: number;
    current?: number;
}, PaginationEvents, {}, {
    pages: number;
    current: number;
    show: number;
}>;
