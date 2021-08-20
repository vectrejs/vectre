import { defineComponent, VNode } from 'vue';
import { Step } from './Step';

export const Steps = /*#__PURE__*/ defineComponent({
  name: 'Steps',
  props: {
    items: { type: [Array, Object], default: (): Record<string, any>[] => [] },
    active: {
      type: [Number, String],
      default: 1,
    },
  },
  render(): VNode {
    const items = Array.isArray(this.$props.items) ? { ...this.$props.items } : this.$props.items;
    const steps = Object.keys(items).map((key, index): VNode => {
      const active = String(index) === key ? this.$props.active == index + 1 : this.$props.active == key;

      return (
        <Step tooltip={items[key as any].tooltip} active={active}>
          {items[key as any].name}
        </Step>
      );
    });

    const children = (this.$slots.default && this.$slots.default()) || [];

    children.forEach((child, i: number): void => {
      if (i + 1 == this.$props.active) {
        child.props = { ...child.props, class: [child.props?.class, 'active'] };
      }
    });

    return <div class="step">{(steps.length && steps) || children}</div>;
  },
});
