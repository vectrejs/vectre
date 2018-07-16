import { routes as components } from './components';
import { RouteConfig } from 'vue-router';
import Parent from '../component/Parent.vue'

const routes: RouteConfig[] = [
  { path: '/components',  title: 'Components', component: Parent, children: (<any>Object).values(components) }
];

export default routes;
export * from './components';
