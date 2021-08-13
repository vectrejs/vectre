import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const OffCanvasContent = defineComponent({
  name: 'OffCanvasContent',
  setup(_, { attrs, slots }) {
    const cssClass = mergeCss(attrs, 'off-canvas-content');

    return (): VNode => (
      <div {...attrs} class={cssClass}>
        {slots.default && slots.default()}
      </div>
    );
  },
});
