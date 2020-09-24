import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const NavigationItem = tsx.component({
  name: 'NavigationItem',
  functional: true,
  props: {
    active: { type: Boolean, default: false },
  },
  render(h: CreateElement, { props, children }): VNode {
    return (
      <li staticClass="nav-item" class={props.active && 'active'}>
        {children}
      </li>
    );
  },
});
