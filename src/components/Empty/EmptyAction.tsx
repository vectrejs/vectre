import { defineComponent, VNode } from 'vue';

export const EmptyAction = defineComponent({
  name: 'EmptyAction',
  render(): VNode {
    return <p class="empty-action">{this.$slots.default && this.$slots.default()}</p>;
  },
});
