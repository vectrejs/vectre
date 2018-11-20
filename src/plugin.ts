import { PluginFunction } from 'vue';
import components from './components';
import layout from './layout';
import directives from './directive';

const all: { [name: string]: any } = { ...components, ...layout };

interface IPluginOptions {
  prefix?: string;
}

export const VectrePlugin: PluginFunction<IPluginOptions> = (vue, options): void => {
  const prefix = options && options.prefix ? options.prefix : '';

  for (const component of Object.keys(all)) {
    vue.component(prefix + component, all[component]);
  }

  for (const directive of Object.keys(directives)) {
    vue.directive(prefix + directive, (directives as any)[directive]);
  }
};
