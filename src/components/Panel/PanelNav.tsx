import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const PanelNav = tsx.component({
  name: 'PanelNav',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    const cssClass = mergeCss(data, 'panel-nav');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
