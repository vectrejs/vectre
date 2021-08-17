import { defineComponent, VNode } from 'vue';

export const EmptyTitle = defineComponent({
  name: 'EmptyTitle',
  render(): VNode {
    return <p class="empty-title h5">{this.$slots.default && this.$slots.default()}</p>;
  },
});
