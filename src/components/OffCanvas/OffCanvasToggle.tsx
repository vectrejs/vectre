import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';
import { flattenListener } from '../../utils/listener';
import { IconType, Icon } from '../Icon';
import { OffCanvasToggleEvents } from './Events';

export const OffCanvasToggle = tsx.componentFactoryOf<OffCanvasToggleEvents>().create({
  name: 'OffCanvasToggle',
  functional: true,
  props: {
    icon: { type: String as () => IconType, default: 'menu' as IconType },
  },
  render(h: CreateElement, { data, props, children = [], listeners }): VNode {
    const cssClass = mergeCss(data, 'off-canvas-toggle');
    const onClick = flattenListener(listeners.click);

    return (
      <div {...data} class={cssClass}>
        <a staticClass="btn btn-primary btn-action" onClick={onClick}>
          {(children.length && children) || <Icon name={props.icon} />}
        </a>
      </div>
    );
  },
});
