import * as tsx from 'vue-tsx-support';
import { TabEvents } from './Events';
import './tab.scss';
export declare const Tab: tsx.TsxComponent<import("vue").default, {} & {
    active?: boolean;
    badge?: string | number;
}, TabEvents, {}, {
    active: boolean;
    badge: string | number;
}>;
