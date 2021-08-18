import { defineComponent, VNode } from 'vue';

export const ToastBody = defineComponent({
  name: 'ToastBody',
  render(): VNode {
    return <div class="toast-body">{this.$slots.default && this.$slots.default()}</div>;
  },
});
