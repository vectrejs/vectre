import { hasSlot } from '../../utils/component';
import { defineComponent, VNode } from 'vue';
import { VerticalMenuItemBadge } from './VerticalMenuItemBadge';

export const VerticalMenuItem = defineComponent({
  name: 'VerticalMenuItem',
  props: {
    active: { type: Boolean },
    badge: { type: [String, Number], default: undefined },
    text: { type: String, default: undefined },
    path: { type: String, default: undefined },
  },
  render(): VNode {
    const hasDefaultSlot = hasSlot(this.$slots, 'default');

    if (hasDefaultSlot) {
      return <li class="menu-item">{this.$slots.default()}</li>;
    }

    const badge = this.$props.badge && (
      <VerticalMenuItemBadge type="primary">{this.$props.badge}</VerticalMenuItemBadge>
    );

    const link = (
      <a href={this.$props.path} class={this.$props.active && 'active'}>
        {this.$props.text}
      </a>
    );

    return (
      <li class="menu-item">
        {badge} {link}
      </li>
    );
  },
});
