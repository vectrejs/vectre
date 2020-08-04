import { PluginFunction } from 'vue';
import { addPrefix } from './utils/prefix';
import { default as components } from './components';
import layout from './layout';
import directives from './directives';

const allComponents: { [name: string]: any } = { ...components, ...layout };

export interface PluginOptions {
  prefix?: string;
}

const VectrePlugin: PluginFunction<PluginOptions> = (vue, options = { prefix: '' }): void => {
  for (const component of Object.keys(allComponents)) {
    vue.component(addPrefix(component, options.prefix), allComponents[component]);
  }

  for (const directive of Object.keys(directives)) {
    vue.directive(addPrefix(directive, options.prefix, '-'), (directives as any)[directive]);
  }
};

export default Object.assign(VectrePlugin, { components, layout, directives });
