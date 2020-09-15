import vue, { VueConstructor, PluginFunction, DirectiveFunction } from 'vue';
export declare const makePluggableComponents: (components?: Record<string, VueConstructor<vue>>) => PluginFunction<{
    prefix?: string;
}>;
export declare const makePluggableDirectives: (directives?: Record<string, DirectiveFunction>) => PluginFunction<{
    prefix?: string;
}>;
