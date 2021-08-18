import { defineComponent, VNode } from 'vue';
// import { TabEvents } from './Events';
import './tab.scss';

export const Tab = defineComponent({
  name: 'Tab',

  props: {
    active: { type: Boolean, default: false },
    badge: { type: [String, Number], default: undefined },
    onClick: { type: Function, default: undefined },
  },
  emits: ['click'],
  render(): VNode {
    return (
      <span onClick={this.$props.onClick} class={['tab-item', this.$props.active && 'active']}>
        <a class={[this.$props.badge && 'badge']} data-badge={this.$props.badge}>
          {this.$slots.default && this.$slots.default()}
        </a>
      </span>
    );
  },
});
