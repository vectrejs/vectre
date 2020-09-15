import Vue, { VNode, CreateElement } from 'vue';

export const Loading = Vue.extend({
  name: 'FormInputLoading',
  functional: true,
  render(h: CreateElement): VNode {
    return <i class="form-icon loading" />;
  },
});
