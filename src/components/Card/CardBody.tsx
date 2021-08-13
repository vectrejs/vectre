import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const CardBody = defineComponent({
  name: 'CardBody',
  setup(_, { attrs, slots }) {
    const cssClass = mergeCss(attrs, 'card-body');

    return (): VNode => (
      <div {...attrs} class={cssClass}>
        {slots && slots.default()}
      </div>
    );
  },
});
