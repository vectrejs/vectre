import { defineComponent, VNode } from 'vue';

export const PanelBody = defineComponent({
  name: 'PanelBody',
  render(): VNode {
    return <div class="panel-body">{this.$slots.default && this.$slots.default()}</div>;
  },
});
