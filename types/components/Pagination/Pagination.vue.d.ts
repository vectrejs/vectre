import vue from 'vue';
export default class Pagination extends vue {
    pages: number | string[];
    current: number | string;
    show: number;
    change(current: number): void;
}
