import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const ToastContent = tsx.component({
  name: 'ToastContent',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'toast-content');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
