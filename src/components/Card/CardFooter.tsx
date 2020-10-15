import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const CardFooter = tsx.component({
  name: 'CardFooter',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    const cssClass = mergeCss(data, 'card-footer');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
