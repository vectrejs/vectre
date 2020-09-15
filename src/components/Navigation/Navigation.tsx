import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { NavigationItem } from './NavigationItem';

export const Navigation = tsx.component({
  name: 'Navigation',
  functional: true,
  props: {
    items: { type: [Array, Object], default: (): any[] => [] },
    level: { type: [String, Number], default: -1 },
  },
  render(h: CreateElement, { props, scopedSlots, slots }): VNode {
    const items = Array.isArray(props.items) ? { ...props.items } : props.items;
    const navItems = Object.keys(items).map(
      (key: string | number): VNode => {
        const item = items[key];

        const sub = item.items && props.level != 0 && (
          <Navigation
            items={item.items}
            level={Number(props.level) - 1}
            scopedSlots={{ default: scopedSlots.default }}
          />
        );
        const slot = scopedSlots.default && scopedSlots.default({ item, index: key, level: props.level });
        const link = <a href={item.path}>{item.text}</a>;
        const navItem = <NavigationItem active={item.active}>{slot || link}</NavigationItem>;

        return (
          <NavigationItem>
            {navItem}
            {sub}
          </NavigationItem>
        );
      },
    );

    return <ul staticClass="nav">{slots().default || navItems}</ul>;
  },
});
