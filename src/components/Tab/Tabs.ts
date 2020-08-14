import vue, { PropOptions, VNode, CreateElement } from 'vue';
import Tab from './Tab.vue';

type EmitFunction = (event: string, ...args: any[]) => vue;

const updateCurrent = (current: string | number, emit: EmitFunction): void => {
  emit('update:current', current);
};

const createTab = (v: vue, origin: VNode, key: number | string, isActive = false): VNode => {
  return v.$createElement(
    Tab,
    {
      props: origin.componentOptions && origin.componentOptions.propsData,
      class: { active: isActive },
      nativeOn: {
        click: (): void => {
          !isActive && updateCurrent(key, v.$emit.bind(v));
        },
      },
    },
    origin.componentOptions && origin.componentOptions.children,
  );
};

const createSimpleTab = (v: vue, item: string, isActive: boolean): VNode => {
  return v.$createElement(
    Tab,
    {
      class: { active: isActive },
      nativeOn: {
        click: (): void => {
          if (!isActive) {
            updateCurrent(item, v.$emit.bind(v));
          }
        },
      },
    },
    [item],
  );
};

export const Tabs = vue.extend({
  name: 'Tabs',
  props: {
    current: {
      type: [String, Number],
    },
    items: {
      type: Array,
      default: () => [],
    } as PropOptions<string[]>,
    block: {
      type: Boolean,
      default: false,
    },
  },

  render(h: CreateElement): VNode {
    const { items, current, block } = this.$props;
    const cssClass = { tab: true, 'tab-block': block };

    let tabs = [];

    if (items.length) {
      tabs = items.map((item: string) => {
        const isActive = current === item;
        return createSimpleTab(this, item, isActive);
      });

      return h('div', { class: cssClass }, tabs);
    }

    const { default: children = [] } = this.$slots;

    tabs = children
      .filter(
        (child: VNode) =>
          child.componentOptions && child.componentOptions.tag && child.componentOptions.tag.includes('tab'),
      )
      .map((tab: VNode, i) => {
        const key = tab.key || i + 1;
        const isActive = current === key;

        return createTab(this, tab, key, isActive);
      });

    const tabsActions = children
      .filter((child: VNode) => child.tag !== undefined && child.tag.includes('tab-actions'))
      .map((n: VNode) => h('span', { class: ['tab-item', 'tab-action'] }, n.children));

    return h('div', { class: cssClass }, [tabs, tabsActions]);
  },
});
