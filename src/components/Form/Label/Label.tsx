import * as tsx from 'vue-tsx-support';
import { LabelSizes, LabelSize } from './LabelSize';
import { CreateElement, VNode } from 'vue';

export const Label = tsx.createComponent({
  name: 'FormLabel',
  functional: true,
  props: {
    size: {
      type: String,
      default: undefined,
      validator: (v: string): boolean => !v || Object.keys(LabelSizes).includes(v),
    },
  },
  render(h: CreateElement, { props, children, data }): VNode {
    const cssClasses = ['form-label', LabelSizes[props.size as LabelSize]];

    return (
      <label class={cssClasses} {...data}>
        {children}
      </label>
    );
  },
});
