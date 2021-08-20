import { defineComponent, VNode } from 'vue';

export const FormHorizontal = defineComponent({
  name: 'FormHorizontal',
  render(): VNode {
    return <div class="form-horizontal">{this.$slots.default && this.$slots.default()}</div>;
  },
});
