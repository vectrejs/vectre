import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const CardFooter = defineComponent({
  name: 'CardFooter',
  setup(_, { attrs, slots }) {
    const cssClass = mergeCss(attrs, 'card-footer');

    return (): VNode => (
      <div {...attrs} class={cssClass}>
        {slots && slots.default()}
      </div>
    );
  },
});
