import { defineComponent, VNode } from 'vue';
import { Tooltip } from '../../directives';

export const FormSlider = /*#__PURE__*/ defineComponent({
  name: 'FormSlider',
  directives: {
    Tooltip,
  },
  props: {
    min: { type: [String, Number], default: 0 },
    max: { type: [String, Number], default: 100 },
    step: { type: [String, Number], default: 1 },
    modelValue: { type: [String, Number], default: undefined },
    tooltip: { type: [Boolean, String, Function], default: undefined },
    disabled: { type: Boolean, default: false },
    onInput: { type: Function, default: undefined },
  },
  emits: ['input', 'update:modelValue'],
  computed: {
    tooltipText(): string | number {
      if (typeof this.tooltip === 'undefined') {
        return;
      }

      if (typeof this.tooltip === 'boolean') {
        return this.tooltip && this.modelValue;
      }

      if (typeof this.tooltip === 'string') {
        return `${this.modelValue}${this.tooltip}`;
      }

      if (typeof this.tooltip === 'function') {
        return this.tooltip(this.modelValue);
      }

      throw new TypeError('Wrong type of tooltip');
    },
  },
  render(): VNode {
    const onInput = (e: Event): void => {
      const value = (e.target as HTMLInputElement).value;
      if (this.onInput) {
        this.onInput(value);
      }

      this.$emit('update:modelValue', value);
    };

    return (
      <input
        v-tooltip={this.tooltipText}
        class="slider"
        type="range"
        min={this.min}
        max={this.max}
        step={this.step}
        value={this.modelValue}
        onInput={onInput}
        onTouchmove={onInput}
        disabled={this.disabled}
      />
    );
  },
});
