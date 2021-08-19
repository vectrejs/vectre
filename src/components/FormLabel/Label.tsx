import { FormLabelSizes, FormLabelSize } from './LabelSize';
import { defineComponent, PropType, VNode } from 'vue';

export const FormLabel = /*#__PURE__*/ defineComponent({
  name: 'FormLabel',

  props: {
    size: {
      type: String as PropType<FormLabelSize>,
      default: undefined,
      validator: (v: string): boolean => !v || Object.keys(FormLabelSizes).includes(v),
    },
  },
  render(): VNode {
    return (
      <label class={['form-label', FormLabelSizes[this.$props.size]]}>
        {this.$slots.default && this.$slots.default()}
      </label>
    );
  },
});
