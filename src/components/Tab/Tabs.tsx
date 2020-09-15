import { VNode, CreateElement } from 'vue';
import * as tsx from 'vue-tsx-support';
import { flattenListener } from '../../utils/listener';
import { Tab } from './Tab';
import { mergeCss } from '../../utils/css';
import { TabAction } from './TabAction';
import { TabsEvents } from './Events';

export const Tabs = tsx.componentFactoryOf<TabsEvents>().create({
  name: 'Tabs',
  functional: true,
  model: {
    prop: 'current',
    event: 'change',
  },
  props: {
    current: {
      type: [String, Number],
      default: 0,
    },
    items: {
      type: Array as () => string[],
      default: (): string[] => [],
    },
    block: {
      type: Boolean,
      default: false,
    },
  },

  render(h: CreateElement, { data, slots, scopedSlots, props, listeners }): VNode {
    const { items, current, block } = props;
    const cssClass = mergeCss(data, 'tab', [block && 'tab-block']);
    const onChange = (tabIndex: string | number) => (): void => flattenListener(listeners.change)(tabIndex);

    const _slots = slots();
    const children = _slots.default;

    const tabs = items.map((item: string | any, index: number) => {
      const key = typeof item === 'string' ? item : item.key || index;
      const isActive = current === key;

      return (
        <Tab active={isActive} onClick={onChange(key)} badge={item.badge}>
          {scopedSlots.tab && scopedSlots.tab({ item, index })}
          {!scopedSlots.tab && item}
        </Tab>
      );
    });

    (children || [])
      .filter((child: VNode) => {
        return child.data && child.data.class && child.data.class.includes('tab-item');
      })
      .forEach((tab: VNode, i: number) => {
        const isActive = i === current;

        if (tab.data) {
          tab.data.class = [...tab.data.class, isActive && 'active'];
          tab.data.on = {
            ...tab.data.on,
            click: [onChange(i), flattenListener(tab.data.on && tab.data.on.click)],
          };
        } else {
          tab.data.on = { click: onChange(tab.key || i) };
        }

        return tab;
      });

    const action = _slots.action && <TabAction>{_slots.action}</TabAction>;

    return (
      <div {...data} class={cssClass}>
        {children || tabs}
        {action}
      </div>
    );
  },
});
