import { defineComponent, VNode } from 'vue';

export const ToastTitle = defineComponent({
  name: 'ToastTitle',

  render(): VNode {
    return <h5 class="toast-title">{this.$slots.default && this.$slots.default()}</h5>;
  },
});
