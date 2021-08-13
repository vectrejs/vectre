import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const CardHeader = defineComponent({
  name: 'CardHeader',
  setup(_, { attrs, slots }) {
    const cssClass = mergeCss(attrs, 'card-header');

    return (): VNode => (
      <div {...attrs} class={cssClass}>
        {slots && slots.default()}
      </div>
    );
  },
});
