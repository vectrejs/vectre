import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const Card = tsx.component({
  name: 'Card',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    const cssClass = mergeCss(data, 'card');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
