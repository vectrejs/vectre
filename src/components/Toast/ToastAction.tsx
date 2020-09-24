import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const ToastAction = tsx.component({
  name: 'ToastAction',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'toast-action');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
