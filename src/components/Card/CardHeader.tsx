import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const CardHeader = tsx.component({
  name: 'CardHeader',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    const cssClass = mergeCss(data, 'card-header');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
