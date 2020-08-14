import { VNode, CreateElement } from 'vue';
import * as tsx from 'vue-tsx-support';
import { cachedListeners, cachedAttrs } from 'src/mixins/cache';

export interface FormSelectOptionProps {
  value?: string;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}

export const FormSelectOption = tsx
  .componentFactoryOf()
  .mixin(cachedListeners)
  .mixin(cachedAttrs)
  .create({
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
