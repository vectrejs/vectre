import Vue, { CreateElement, VNode } from 'vue';
import { Sides, Side } from './Side';

const createPopoverContainer = (h: CreateElement, nodes: VNode[]): VNode => {
  return h('div', { class: 'popover-container' }, nodes);
};

export const Popover = Vue.extend({
  name: 'Popover',
  props: {
    side: {
      type: String,
      default: undefined,
      validator: (side: string): boolean => Object.keys(Sides).includes(side),
    },
  },
  render(h: CreateElement): VNode {
    const elements = this.$slots.default || [];
    return h('div', { class: ['popover', Sides[this.side as Side]] }, [
      elements.slice(0, 1),
      createPopoverContainer(h, elements.slice(1)),
    ]);
  },
});
