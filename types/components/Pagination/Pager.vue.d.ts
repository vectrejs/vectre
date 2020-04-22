import vue from 'vue';
export declare type PagerItem = number | string;
export default class Pager extends vue {
    pages: number;
    current: number;
    show: number;
    get items(): PagerItem[];
    change(current: number): void;
    next(): void;
    previous(): void;
}
