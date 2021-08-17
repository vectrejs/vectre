import { defineComponent, PropType, VNode } from 'vue';

export const Bar = defineComponent({
  name: 'Bar',
  props: {
    sm: { type: Boolean },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    value: { type: Number, default: 0 },
    tooltip: {
      type: [String, Function] as PropType<string | ((value: number) => string)>,
      default: undefined,
    },
  },
  render(): VNode {
    const barCssClass = ['bar', this.$props.sm && 'bar-sm'];
    const barItemCssClass = ['bar-item', this.$props.tooltip && 'tooltip'];
    const barItemStyles = { width: (this.$props.value / this.$props.max) * 100 + '%' };
    const tooltip =
      typeof this.$props.tooltip === 'function' ? this.$props.tooltip(this.$props.value) : this.$props.tooltip;

    return (
      <div class={barCssClass}>
        <div
          class={barItemCssClass}
          style={barItemStyles}
          data-tooltip={tooltip}
          aria-valuenow={this.$props.value}
          aria-valuemin={this.$props.min}
          aria-valuemax={this.$props.max}
          role="progressbar"
        />
      </div>
    );
  },
});
