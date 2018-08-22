import Vue, { VueConstructor, PluginFunction } from 'vue';
import components from './components';
import layout from './layout';
import directives from './directive';

const all: { [name: string]: VueConstructor } = { ...components, ...layout };

export default ((vue: typeof Vue, options = { prefix: '' }): void => {
  for (let component in all) {
    vue.component(options.prefix + component, all[component]);
  }

  for (let directive in directives) {
    vue.directive(options.prefix + directive, (directives as any)[directive]);
  }
}) as PluginFunction<{ prefix?: string }>;
