import 'vue-anchored-menu';
import { RouteConfig } from 'vue-router';
import Parent from '../component/Parent.vue';
import { LayoutRoute } from './Layout';
import { routes as elementRoutes } from './Elements';
import { routes as componentRoutes } from './Components';
import { routes as formRoutes } from './Form';

const routes = [
  {
    path: '/elements',
    title: 'Elements',
    component: Parent,
    children: Object.values(elementRoutes),
  },
  LayoutRoute,
  {
    path: '/form',
    title:  'Form',
    component: Parent,
    children: Object.values(formRoutes),
  },
  {
    path: '/components',
    title:  'Components',
    component: Parent,
    children: Object.values(componentRoutes),
  },
] as RouteConfig[];

export default routes;
