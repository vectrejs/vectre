import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const ToastBody = tsx.component({
  name: 'ToastBody',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'toast-body');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
