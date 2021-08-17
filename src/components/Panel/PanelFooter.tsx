import { defineComponent, VNode } from 'vue';

export const PanelFooter = defineComponent({
  name: 'PanelFooter',
  render(): VNode {
    return <div class="panel-footer">{this.$slots.default && this.$slots.default()}</div>;
  },
});
