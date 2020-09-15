import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const PanelHeader = tsx.component({
  name: 'PanelHeader',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    const cssClass = mergeCss(data, 'panel-header');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
