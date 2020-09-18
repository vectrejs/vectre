import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { VerticalMenuItem } from './VerticalMenuItem';
import { VerticalMenuDivider } from './VerticalMenuDivider';

export const VerticalMenu = /*#__PURE__*/ tsx.component({
  name: 'VerticalMenu',
  functional: true,
  props: {
    items: { type: [Array, Object], default: (): [] => [] },
    active: { type: [Number, String], default: '' },
  },
  render(h: CreateElement, { props, slots, scopedSlots, data }): VNode {
    if (!props.items) {
      throw new TypeError('Items cannot be empty');
    }

    const items = Array.isArray(props.items) ? { ...props.items } : props.items;
    const menuItems = Object.keys(items).map((key: string | number) => {
      if (items[key].divider) {
        return <VerticalMenuDivider text={items[key].divider} />;
      }

      return (
        <VerticalMenuItem
          active={key.toString() === props.active.toString()}
          badge={items[key].badge}
          path={items[key].path}
          text={items[key].text}
        >
          {scopedSlots.default && scopedSlots.default({ item: items[key], index: key })}
        </VerticalMenuItem>
      );
    });

    return (
      <ul {...data} class={['menu', data.class]}>
        {slots().default}
        {menuItems}
      </ul>
    );
  },
});
