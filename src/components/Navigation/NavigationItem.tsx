import { defineComponent, VNode } from 'vue';

export const NavigationItem = defineComponent({
  name: 'NavigationItem',
  props: {
    active: { type: Boolean, default: false },
  },
  render(): VNode {
    return <li class={['nav-item', this.$props.active && 'active']}>{this.$slots.default && this.$slots.default()}</li>;
  },
});
