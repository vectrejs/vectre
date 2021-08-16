import { defineComponent, PropType, VNode } from 'vue';
import { VerticalMenuItem } from './VerticalMenuItem';
import { VerticalMenuDivider } from './VerticalMenuDivider';
import { VerticalMenuDividerData, VerticalMenuItemData, VerticalMenuItems } from './interface';
import { mergeCss } from '../../utils/css';

export const VerticalMenu = /*#__PURE__*/ defineComponent({
  name: 'VerticalMenu',
  props: {
    items: { type: [Array, Object] as PropType<VerticalMenuItems>, default: (): [] => [] },
    active: { type: [Number, String], default: '' },
  },
  setup(props, { slots, attrs }) {
    if (!props.items) {
      throw new TypeError('Items cannot be empty');
    }

    // TODO remove `as` to fix typings
    const items = (Array.isArray(props.items) ? { ...props.items } : props.items) as Record<
      string,
      VerticalMenuItemData & VerticalMenuDividerData
    >;
    const menuItems = Object.keys(items).map((key: string) => {
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
          {slots.item && slots.item({ item: items[key], index: key })}
        </VerticalMenuItem>
      );
    });
    const cssClass = mergeCss(attrs, 'menu');

    return (): VNode => (
      <ul {...attrs} class={cssClass}>
        {!!menuItems.length && menuItems}
        {!menuItems.length && slots.default()}
      </ul>
    );
  },
});
