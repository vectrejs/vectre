import { defineComponent, VNode } from 'vue';

export const PanelNav = defineComponent({
  name: 'PanelNav',
  render(): VNode {
    return <div class="panel-nav">{this.$slots.default && this.$slots.default()}</div>;
  },
});
