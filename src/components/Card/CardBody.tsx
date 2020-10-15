import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const CardBody = tsx.component({
  name: 'CardBody',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    const cssClass = mergeCss(data, 'card-body');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
