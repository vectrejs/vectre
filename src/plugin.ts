import Vue, { VueConstructor, PluginFunction } from 'vue';
import components from './components';
import layout from './layout';

const all: { [name: string]: VueConstructor } = { ...components, ...layout };

export default ((vue: typeof Vue, options = { prefix: '' }): void => {
  for (let component in all) {
    vue.component(options.prefix + component, all[component]);
  }
}) as PluginFunction<{ prefix?: string }>;
