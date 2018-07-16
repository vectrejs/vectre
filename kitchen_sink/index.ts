import vue from 'vue';
import AppVue from './App.vue';

vue.config.devtools = true;

export default new vue({
  el: '#app',
  render: h => h(AppVue),
});
