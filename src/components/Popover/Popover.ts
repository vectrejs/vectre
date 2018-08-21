import Vue, { CreateElement, VNode } from 'vue';
import { Side } from './Side';

const createPopoverContainer = (h: CreateElement, nodes: VNode[]) => {
  return h('div', { class: 'popover-container' }, nodes);
};

export const Popover = Vue.extend({
  props: {
    side: {
      type: String,
      validator: (side: string) => Object.keys(Side).includes(side),
    },
  },
  render(h) {
    const elements = this.$slots.default || [];
    return h('div', { class: ['popover', Side[this.$props.side]] }, [
      elements.slice(0, 1),
      createPopoverContainer(h, elements.slice(1)),
    ]);
  },
});
