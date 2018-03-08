import vue from 'vue';
import AppVue from './App.vue';

export default new vue({
  el: '#app',
  render: h => h(AppVue),
});
