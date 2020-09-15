import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const Bar = tsx.component({
  name: 'Bar',
  functional: true,
  props: {
    sm: { type: Boolean },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    value: { type: Number, default: 0 },
    tooltip: {
      type: [String, Function] as (() => string | ((value: number) => string))[],
      default: undefined,
    },
  },
  render(h: CreateElement, { props }): VNode {
    const barCssClass = ['bar', props.sm && 'bar-sm'];
    const barItemCssClass = ['bar-item', props.tooltip && 'tooltip'];
    const barItemStyles = { width: (props.value / props.max) * 100 + '%' };

    return (
      <div class={barCssClass}>
        <div
          class={barItemCssClass}
          style={barItemStyles}
          data-tooltip={props.tooltip}
          aria-valuenow={props.value}
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          role="progressbar"
        />
      </div>
    );
  },
});
