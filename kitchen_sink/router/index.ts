import vue from 'vue';
import vueRouter from 'vue-router';
import { PositionResult } from 'vue-router/types/router';
import routes from '../routes';

vue.use(vueRouter);

export default new vueRouter({
  routes,
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return { selector: to.hash };
    }
  },
});
