import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { VerticalMenuItemBadge } from './VerticalMenuItemBadge';

export const VerticalMenuItem = tsx.component({
  name: 'VerticalMenuItem',
  functional: true,
  props: {
    active: { type: Boolean },
    badge: { type: [String, Number], default: undefined },
    text: { type: String, default: undefined },
    path: { type: String, default: undefined },
  },
  render(h: CreateElement, { props, children }): VNode {
    if (children && children.length) {
      return <li staticClass="menu-item">{children}</li>;
    }

    const badge = props.badge && <VerticalMenuItemBadge type="primary">{props.badge}</VerticalMenuItemBadge>;
    const link = (
      <a href={props.path} class={props.active && 'active'}>
        {props.text}
      </a>
    );

    return (
      <li staticClass="menu-item">
        {badge} {link}
      </li>
    );
  },
});
