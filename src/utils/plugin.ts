import { App, Plugin, Directive, Component } from 'vue';
import { addPrefix } from './prefix';
import { capitalize, uncapitalize } from './string';

export const makePluggableComponents = /*#__PURE__*/ (components = {} as Record<string, Component>): Plugin => {
  return (app: App, options = { prefix: '' }): void => {
    Object.keys(components).forEach((name) =>
      app.component(addPrefix(capitalize(name), options.prefix), components[name]),
    );
  };
};

export const makePluggableDirectives = /*#__PURE__*/ (directives = {} as Record<string, Directive>): Plugin => {
  return (app: App, options = { prefix: '' }): void => {
    Object.keys(directives).forEach((name) =>
      app.directive(addPrefix(uncapitalize(name), options.prefix, '-'), directives[name]),
    );
  };
};
