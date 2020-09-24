import * as tsx from 'vue-tsx-support';
import { PaginationEvents } from './Events';
import './styles.scss';
export declare const Pagination: tsx.TsxComponent<import("vue").default, {
    pages: number | string[];
} & {
    show?: number;
    current?: string | number;
}, PaginationEvents, {}, {
    pages: number | string[];
    current: string | number;
    show: number;
}>;
