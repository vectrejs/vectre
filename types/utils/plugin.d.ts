import { VueConstructor, PluginFunction, DirectiveFunction } from 'vue';
export declare const makePluggableComponents: (components?: Record<string, VueConstructor<import("vue/types/umd")>>) => PluginFunction<{
    prefix?: string;
}>;
export declare const makePluggableDirectives: (directives?: Record<string, DirectiveFunction>) => PluginFunction<{
    prefix?: string;
}>;
