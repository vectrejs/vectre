import { VNode, defineComponent, PropType } from 'vue';
import { flattenListener } from '../../utils/listener';
import { Tab } from './Tab';
import { TabAction } from './TabAction';
// import { TabsEvents } from './Events';

export const Tabs = /*#__PURE__*/ defineComponent({
  name: 'Tabs',
  props: {
    modelValue: { type: [String, Number], default: 0 },
    items: { type: Array as PropType<string[] | Record<string, unknown>[]>, default: (): string[] => [] },
    block: { type: Boolean, default: false },
    onChange: { type: Function, default: undefined },
  },
  emits: ['change', 'update:modelValue'],
  render(): VNode {
    const { items, modelValue, block } = this.$props;
    const onChange = flattenListener([
      this.onChange,
      (tabIndex: string | number): void => this.$emit('update:modelValue', tabIndex),
    ]);

    const tabs = items.map((item: string | any, index: number) => {
      const key = typeof item === 'string' ? item : item.key || index;
      const isActive = modelValue === key;

      return (
        <Tab active={isActive} onClick={(): void => onChange(key)} badge={item.badge}>
          {this.$slots.tab && this.$slots.tab({ item, index })}
          {!this.$slots.tab && item}
        </Tab>
      );
    });

    const children = (this.$slots.default && this.$slots.default()) || [];
    children
      .filter(({ type }) => {
        if (typeof type === 'object' && 'name' in type) {
          return type.name === 'Tab';
        }
      })
      .forEach((tab: VNode, i: number) => {
        const isActive = i === modelValue;
        const onClick = tab.props?.onClick;

        // TODO find another more obvious way to set an undefined 'active' property
        // such calculations are very expensive on each render
        const dynamicProps = (tab as any).dynamicProps || [];
        (tab as any).dynamicProps = [...new Set([...dynamicProps, 'active'])];

        tab.props = {
          ...tab.props,
          active: isActive,
          onClick: (): void => {
            onClick && onClick(tab.key || i);
            onChange(tab.key || i);
          },
        };
      });

    const action = this.$slots.action && <TabAction>{this.$slots.action()}</TabAction>;

    return (
      <div class={['tab', block && 'tab-block']}>
        {(children.length && children) || tabs}
        {action}
      </div>
    );
  },
});
