import Vue, { VNode, CreateElement } from 'vue';

export const Loading = Vue.extend({
  render(h: CreateElement): VNode {
    return <i class="form-icon loading" />;
  },
});
