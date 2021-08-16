import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const PanelFooter = tsx.component({
  name: 'PanelFooter',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    const cssClass = mergeCss(data, 'panel-footer');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
