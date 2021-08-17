import { defineComponent, VNode } from 'vue';

export const EmptySubtitle = defineComponent({
  name: 'EmptySubtitle',
  render(): VNode {
    return <p class="empty-title">{this.$slots.default && this.$slots.default()}</p>;
  },
});
