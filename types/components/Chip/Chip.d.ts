import * as tsx from 'vue-tsx-support';
import { ChipEvents } from './Event';
export declare const Chip: tsx.TsxComponent<import("vue").default, {
    text: string;
} & {
    active?: boolean;
    avatar?: string;
    initials?: string;
    small?: boolean;
}, ChipEvents, {}, {
    active: boolean;
    text: string;
    avatar: string;
    initials: string;
    small: boolean;
}>;
