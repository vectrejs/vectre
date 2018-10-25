import vue from 'vue';
import vueRouter from 'vue-router';
import { routes } from './view';

vue.use(vueRouter);

export default new vueRouter({
  routes,
  mode: 'history',
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash, offset: { x: 0, y: 50 } };
    }

    return { x: 0, y: 0 };
  },
});

export {
  routes,
};
