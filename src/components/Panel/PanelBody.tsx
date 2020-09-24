import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const PanelBody = tsx.component({
  name: 'PanelBody',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    const cssClass = mergeCss(data, 'panel-body');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
