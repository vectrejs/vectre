import vue from 'vue';
import vueRouter from 'vue-router';
import { routes } from './view';

vue.use(vueRouter);

export default new vueRouter({
  routes,
  mode: 'history',
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    }
  },
});

export {
  routes,
};
