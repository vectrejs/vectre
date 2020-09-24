import * as tsx from 'vue-tsx-support';
import { VNode, CreateElement } from 'vue';

export interface FormSelectOptionProps {
  value?: string;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}

export const FormSelectOption = tsx.componentFactoryOf().create({
  name: 'FormSelectOption',
  props: {
    disabled: { type: Boolean },
    value: { type: [String, Number], default: '' },
    label: { type: [String, Number] },
    selected: { type: Boolean },
  },

  render(h: CreateElement): VNode {
    const { selected, disabled, value, label } = this.$props;

    return (
      <option selected={selected} disabled={disabled} value={value}>
        {this.$slots.default || label || value}
      </option>
    );
  },
});
