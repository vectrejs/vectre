import { defineComponent, VNode } from 'vue';

export const EmptyContent = defineComponent({
  name: 'EmptyContent',
  render(): VNode {
    return <div class="empty-content">{this.$slots.default && this.$slots.default()}</div>;
  },
});
