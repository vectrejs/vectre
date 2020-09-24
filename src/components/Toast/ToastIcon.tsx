import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { IconType, Icon } from '../Icon';
import { mergeCss } from '../../utils/css';

export const ToastIcon = tsx.component({
  name: 'ToastIcon',
  functional: true,
  props: {
    icon: { type: String as () => IconType, required: true },
    large: { type: Boolean, default: false },
  },
  render(h: CreateElement, { data, props }): VNode {
    const cssClass = mergeCss(data, 'toast-icon', [props.large && 'large']);

    return (
      <div {...data} class={cssClass}>
        <Icon name={props.icon} size={props.large ? 'x2' : undefined} />
      </div>
    );
  },
});
