import { RouteConfig } from 'vue-router';
import { anchors } from './component';
import * as Components from './view.vue';

const components = {
  component: Components,
  meta: {
    anchors,
  },
  path: '/components',
} as RouteConfig;

export default [
  components,
];
