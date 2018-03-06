import vue from 'vue';
import vuePrismComponent from 'vue-prism-component';

import AccordionVue from '../src/components/Accordion.vue';
import ToastVue from '../src/components/Toast.vue';
import './assets.ts';

vue.config.devtools = true;

export default new vue({
  components: {
    accordion: AccordionVue,
    prism: vuePrismComponent,
    toast: ToastVue,
  },
  data: {
    accordions: [
      // tslint:disable:max-line-length
      {
        text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
        title: 'Class',
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. ',
        title: 'Lorem',
      },
      {
        text: 'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.',
        title: 'Mauris',
      },
      // tslint:enable:max-line-length
    ],
    toastcode: '<toast type="primary" icon="mail" closeable>Aloooooooha!</toast>',
  },
  directives: {},
  el: '#app',
});
