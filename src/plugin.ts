import Vue, { VueConstructor, PluginFunction } from 'vue';
import components from './components';
import { Component } from "vue-property-decorator";

const all: { [name: string]: VueConstructor } = components

export default ((vue: typeof Vue, options: { prefix?: string } = { prefix: '' }): void => {
  for (let component in all) {
    vue.component(options.prefix + component, all[component]);
  }
}) as PluginFunction<{ prefix?: string }>;
