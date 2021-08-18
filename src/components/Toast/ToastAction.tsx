import { defineComponent, VNode } from 'vue';

export const ToastAction = defineComponent({
  name: 'ToastAction',
  render(): VNode {
    return <div class="toast-action">{this.$slots.default && this.$slots.default()}</div>;
  },
});
