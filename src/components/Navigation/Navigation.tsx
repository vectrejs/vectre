import { defineComponent, VNode } from 'vue';
import { NavigationItem } from './NavigationItem';

export const Navigation = /*#__PURE__*/ defineComponent({
  name: 'Navigation',

  props: {
    items: { type: [Array, Object], default: (): any[] => [] },
    level: { type: [String, Number], default: -1 },
  },
  render(): VNode {
    const items = Array.isArray(this.$props.items) ? { ...this.$props.items } : this.$props.items;
    const navItems = Object.keys(items).map((key: string | number): VNode => {
      const item = items[key as any]; // TODO fix this `any`

      const sub = item.items && this.$props.level != 0 && (
        <Navigation items={item.items} level={Number(this.$props.level) - 1} v-slots={{ item: this.$slots.item }} />
      );
      const slot = this.$slots.item && this.$slots.item({ item, index: key, level: this.$props.level });
      const link = <a href={item.path}>{item.text}</a>;
      const navItem = <NavigationItem active={item.active}>{slot || link}</NavigationItem>;

      return (
        <NavigationItem>
          {navItem}
          {sub}
        </NavigationItem>
      );
    });

    return <ul class="nav">{(this.$slots.default && this.$slots.default()) || navItems}</ul>;
  },
});
