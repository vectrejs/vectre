import Vue, { CreateElement, VNode } from 'vue';
import { PopoverSides, PopoverSide } from './Side';

const createPopoverContainer = (h: CreateElement, nodes: VNode[]): VNode => {
  return h('div', { class: 'popover-container' }, nodes);
};

export const Popover = Vue.extend({
  name: 'Popover',
  props: {
    side: {
      type: String,
      default: undefined,
      validator: (side: string): boolean => Object.keys(PopoverSides).includes(side),
    },
  },
  render(h: CreateElement): VNode {
    const elements = this.$slots.default || [];
    return h('div', { class: ['popover', PopoverSides[this.side as PopoverSide]] }, [
      elements.slice(0, 1),
      createPopoverContainer(h, elements.slice(1)),
    ]);
  },
});
