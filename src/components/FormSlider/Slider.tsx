import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode, VNodeDirective } from 'vue';
import { flattenListener } from '../../utils/listener';
import { Tooltip } from '../../directives';
import { FormSliderEvents } from './Events';

export const FormSlider = /*#__PURE__*/ tsx.componentFactoryOf<FormSliderEvents>().create({
  name: 'FormSlider',
  directives: {
    Tooltip,
  },
  props: {
    min: { type: [String, Number], default: 0 },
    max: { type: [String, Number], default: 100 },
    step: { type: [String, Number], default: 1 },
    value: { type: [String, Number], default: undefined },
    tooltip: { type: [Boolean, String, Function], default: false },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    tooltipText(): string | number {
      if (typeof this.tooltip === 'boolean') {
        return this.tooltip && this.value;
      }

      if (typeof this.tooltip === 'string') {
        return `${this.value}${this.tooltip}`;
      }

      if (typeof this.tooltip === 'function') {
        return this.tooltip(this.value);
      }

      throw new TypeError('Wrong type of tooltip');
    },
  },
  render(h: CreateElement): VNode {
    const onInput = (e: Event): void => flattenListener(this.$listeners.input)((e.target as HTMLInputElement).value);
    const directives: VNodeDirective[] = [];

    if (this.tooltip) {
      directives.push({
        name: 'tooltip',
        value: this.tooltipText,
      });
    }

    return (
      <input
        {...{ directives }}
        class="slider"
        type="range"
        min={this.min}
        max={this.max}
        step={this.step}
        value={this.value}
        onInput={onInput}
        onTouchmove={onInput}
        disabled={this.disabled}
      />
    );
  },
});
