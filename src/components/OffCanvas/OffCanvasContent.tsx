import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const OffCanvasContent = tsx.component({
  name: 'OffCanvasContent',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'off-canvas-content');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
