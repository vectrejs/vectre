import { VueConstructor, PluginFunction, DirectiveFunction } from 'vue';
import { addPrefix } from './prefix';

export const makePluggableComponents = /*#__PURE__*/ (
  components = {} as Record<string, VueConstructor<Vue>>,
): PluginFunction<{ prefix?: string }> => {
  return (vue: VueConstructor<Vue>, options = { prefix: '' }): void => {
    Object.keys(components).forEach(name => vue.component(addPrefix(name, options.prefix), components[name]));
  };
};

export const makePluggableDirectives = /*#__PURE__*/ (
  directives = {} as Record<string, DirectiveFunction>,
): PluginFunction<{ prefix?: string }> => {
  return (vue: VueConstructor<Vue>, options = { prefix: '' }): void => {
    Object.keys(directives).forEach(name => vue.directive(addPrefix(name, options.prefix, '-'), directives[name]));
  };
};
