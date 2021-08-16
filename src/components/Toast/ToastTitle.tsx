import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const ToastTitle = tsx.component({
  name: 'ToastTitle',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'toast-title');

    return (
      <h5 {...data} class={cssClass}>
        {children}
      </h5>
    );
  },
});
