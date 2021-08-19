import { defineComponent, VNode } from 'vue';

export interface FormSelectOptionProps {
  value?: string;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}

export const FormSelectOption = defineComponent({
  name: 'FormSelectOption',
  props: {
    disabled: { type: Boolean },
    value: { type: [String, Number], default: '' },
    label: { type: [String, Number], default: undefined },
    selected: { type: Boolean },
    onInput: { type: Function, default: undefined },
  },
  emits: ['input'],
  render(): VNode {
    const { selected, disabled, value, label, onInput } = this.$props;

    return (
      <option selected={selected} disabled={disabled} value={value} onInput={onInput}>
        {(this.$slots.default && this.$slots.default()) || label || value}
      </option>
    );
  },
});
