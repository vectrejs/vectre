import vue from 'vue';
export default class SimplePager extends vue {
    pages: string[];
    current: string;
    get previous(): string;
    get next(): string;
    private get curIndex();
    change(page: string): void;
}
