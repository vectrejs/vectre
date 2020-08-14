import { PluginFunction } from 'vue';
export interface PluginOptions {
    prefix?: string;
}
declare const VectrePlugin: PluginFunction<PluginOptions>;
export default VectrePlugin;
