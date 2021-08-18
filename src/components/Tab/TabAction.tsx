import { defineComponent, VNode } from 'vue';

export const TabAction = defineComponent({
  name: 'TabAction',
  render(): VNode {
    return <div class="tab-item tab-action">{this.$slots.default && this.$slots.default()}</div>;
  },
});
