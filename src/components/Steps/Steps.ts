import vue, { VNode, CreateElement } from 'vue';
import Step from './Step.vue';

export const Steps = vue.extend({
  name: 'Steps',
  props: {
    active: {
      type: Number,
      default: 1,
    },
  },

  render(h: CreateElement): VNode {
    const steps = (this.$slots.default || [])
      .filter((n: VNode) => {
        return n.componentOptions !== undefined && n.componentOptions.tag!.includes('step');
      })
      .map((n: VNode, i: number) => {
        return h(
          Step,
          { directives: n.data!.directives, class: [i + 1 === this.$props.active ? 'active' : ''] },
          n.componentOptions!.children,
        );
      });

    return h('div', { class: 'step' }, steps);
  },
});
