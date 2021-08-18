import { defineComponent, VNode } from 'vue';

export const ToastContent = defineComponent({
  name: 'ToastContent',
  render(): VNode {
    return <div class="toast-content">{this.$slots.default && this.$slots.default()}</div>;
  },
});
