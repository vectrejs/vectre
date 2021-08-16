import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TabAction = tsx.component({
  name: 'TabAction',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'tab-item tab-action');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
