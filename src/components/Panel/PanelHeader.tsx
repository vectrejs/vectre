import { defineComponent, VNode } from 'vue';

export const PanelHeader = defineComponent({
  name: 'PanelHeader',
  render(): VNode {
    return <div class="panel-header">{this.$slots.default && this.$slots.default()}</div>;
  },
});
