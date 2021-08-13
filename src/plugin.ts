import { App, Plugin } from 'vue';
import components from './components';
import directives from './directives';

export interface PluginOptions {
  prefix?: string;
}

const VectrePlugin: Plugin = (app: App, options = { prefix: '' }): void => {
  Object.values(components).forEach((c) => app.use(c, options));
  Object.values(directives).forEach((c) => app.use(c, options));
};

export default VectrePlugin;
