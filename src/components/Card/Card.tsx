import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const Card = defineComponent({
  name: 'Card',
  setup(_, { attrs, slots }) {
    const cssClass = mergeCss(attrs, 'card');

    return (): VNode => (
      <div {...attrs} class={cssClass}>
        {slots && slots.default()}
      </div>
    );
  },
});
