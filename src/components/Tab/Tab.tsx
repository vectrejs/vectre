import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';
import { TabEvents } from './Events';
import './tab.scss';

export const Tab = tsx.componentFactoryOf<TabEvents>().create({
  name: 'Tab',
  functional: true,
  props: {
    active: { type: Boolean, default: false },
    badge: { type: [String, Number], default: undefined },
  },
  render(h: CreateElement, { data, props, children }): VNode {
    const cssClass = mergeCss(data, 'tab-item', [props.active && 'active']);

    return (
      <span {...data} class={cssClass}>
        <a class={[props.badge && 'badge']} data-badge={props.badge}>
          {children}
        </a>
      </span>
    );
  },
});
