import 'vue-anchored-menu';
import { RouteConfig } from 'vue-router';
import Layout from './Layout.vue';

const LayoutRoute = {
  path: '/layout',
  title: 'Layout',
  component: Layout,
  anchors: {
    'Flexbox grid': 'flex',
    Responsive: 'responsive',
  },
} as RouteConfig;

export {
  LayoutRoute,
};
