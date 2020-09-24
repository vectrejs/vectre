import Vue from 'vue';
import { ExtendedVue } from 'vue/types/vue';
declare type cached = {
    (data: string): void;
}[];
export declare function cachedProp<CachedKey extends string, T = Record<string, unknown>>(origin: string, cached: CachedKey): ExtendedVue<Vue, {
    [P in CachedKey]: T;
}, Record<string, unknown>, {
    [P in CachedKey]: () => any;
}, Record<string, unknown>>;
export declare const cachedListeners: ExtendedVue<Vue, {
    __listeners: cached;
}, Record<string, unknown>, {
    __listeners: () => any;
}, Record<string, unknown>>;
export declare const cachedAttrs: ExtendedVue<Vue, {
    __attrs: cached;
}, Record<string, unknown>, {
    __attrs: () => any;
}, Record<string, unknown>>;
export {};
