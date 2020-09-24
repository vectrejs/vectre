import * as tsx from 'vue-tsx-support';
import { TabsEvents } from './Events';
export declare const Tabs: tsx.TsxComponent<import("vue").default, {} & {
    items?: string[];
    block?: boolean;
    current?: string | number;
}, TabsEvents, {}, {
    current: string | number;
    items: string[];
    block: boolean;
}>;
