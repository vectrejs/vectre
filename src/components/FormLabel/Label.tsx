import * as tsx from 'vue-tsx-support';
import { FormLabelSizes, FormLabelSize } from './LabelSize';
import { CreateElement, VNode } from 'vue';

export const FormLabel = tsx.createComponent({
  name: 'FormLabel',
  functional: true,
  props: {
    size: {
      type: String,
      default: undefined,
      validator: (v: string): boolean => !v || Object.keys(FormLabelSizes).includes(v),
    },
  },
  render(h: CreateElement, { props, children, data }): VNode {
    const cssClasses = ['form-label', FormLabelSizes[props.size as FormLabelSize]];

    return (
      <label class={cssClasses} {...data}>
        {children}
      </label>
    );
  },
});
