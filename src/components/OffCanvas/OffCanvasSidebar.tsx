import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const OffCanvasSidebar = tsx.component({
  name: 'OffCanvasSidebar',
  functional: true,
  props: {
    active: { type: Boolean, default: false },
  },
  render(h: CreateElement, { data, props, children }): VNode {
    const cssClass = mergeCss(data, 'off-canvas-sidebar', [props.active && 'active']);

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
