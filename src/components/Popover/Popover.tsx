import { defineComponent, PropType, VNode } from 'vue';
import { PopoverSides, PopoverSide } from './Side';

export const Popover = /*#__PURE__*/ defineComponent({
  name: 'Popover',
  props: {
    side: {
      type: String as PropType<PopoverSide>,
      default: undefined,
      validator: (side: PopoverSide): boolean => Object.keys(PopoverSides).includes(side),
    },
  },
  render(): VNode {
    const children = (this.$slots.default && this.$slots.default()) || [];
    const activator = children.shift();

    return (
      <div class={['popover', PopoverSides[this.$props.side]]}>
        {activator}
        <div class="popover-container">{children}</div>
      </div>
    );
  },
});
