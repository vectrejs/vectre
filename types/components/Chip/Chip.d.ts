import * as tsx from 'vue-tsx-support';
import { ChipEvents } from './Event';
export declare const Chip: tsx.TsxComponent<import("vue").default, {
    text: string;
} & {
    small?: boolean;
    active?: boolean;
    initials?: string;
    avatar?: string;
}, ChipEvents, {}, {
    active: boolean;
    text: string;
    avatar: string;
    initials: string;
    small: boolean;
}>;
