import { defineComponent, VNode } from 'vue';

export const Step = defineComponent({
  name: 'Step',

  props: {
    active: { type: Boolean },
    tooltip: { type: String, default: undefined },
  },
  render(): VNode {
    return (
      <span
        class={['step-item', this.$props.active && 'active', this.$props.tooltip && 'tooltip']}
        data-tooltip={this.$props.tooltip}
      >
        <a>{this.$slots.default && this.$slots.default()}</a>
      </span>
    );
  },
});
