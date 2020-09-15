import vue, { VueConstructor, PluginFunction, DirectiveFunction } from 'vue';
import { addPrefix } from './prefix';

export const makePluggableComponents = (
  components = {} as Record<string, VueConstructor<vue>>,
): PluginFunction<{ prefix?: string }> => {
  return (vue: VueConstructor<vue>, options = { prefix: '' }): void => {
    Object.keys(components).forEach(name => vue.component(addPrefix(name, options.prefix), components[name]));
  };
};

export const makePluggableDirectives = (
  directives = {} as Record<string, DirectiveFunction>,
): PluginFunction<{ prefix?: string }> => {
  return (vue: VueConstructor<vue>, options = { prefix: '' }): void => {
    Object.keys(directives).forEach(name => vue.directive(addPrefix(name, options.prefix, '-'), directives[name]));
  };
};
