import { VueConstructor, PluginFunction, DirectiveFunction, DirectiveOptions } from 'vue';
import { addPrefix } from './prefix';
import { capitalize, uncapitalize } from './string';

export const makePluggableComponents = /*#__PURE__*/ (
  components = {} as Record<string, VueConstructor<Vue>>,
): PluginFunction<{ prefix?: string }> => {
  return (vue: VueConstructor<Vue>, options = { prefix: '' }): void => {
    Object.keys(components).forEach((name) =>
      vue.component(addPrefix(capitalize(name), options.prefix), components[name]),
    );
  };
};

export const makePluggableDirectives = /*#__PURE__*/ (
  directives = {} as Record<string, DirectiveFunction | DirectiveOptions>,
): PluginFunction<{ prefix?: string }> => {
  return (vue: VueConstructor<Vue>, options = { prefix: '' }): void => {
    Object.keys(directives).forEach((name) =>
      vue.directive(addPrefix(uncapitalize(name), options.prefix, '-'), directives[name]),
    );
  };
};
