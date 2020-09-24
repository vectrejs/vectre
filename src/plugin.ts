import { PluginFunction } from 'vue';
import components from './components';
import directives from './directives';

export interface PluginOptions {
  prefix?: string;
}

const VectrePlugin: PluginFunction<PluginOptions> = (vue, options = { prefix: '' }): void => {
  Object.values(components).forEach((c) => vue.use(c, options));
  Object.values(directives).forEach((c) => vue.use(c, options));
};

export default Object.assign(VectrePlugin, { components, directives });
