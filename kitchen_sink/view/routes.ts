import 'vue-anchored-menu';
import { RouteConfig } from 'vue-router';
import Parent from '../component/Parent.vue';
import { routes as viewRoutes } from './Components';

const routes = [
  {
    path: '/components',
    title: 'Components',
    component: Parent,
    children: Object.values(viewRoutes),
  },
] as RouteConfig[];

export default routes;
