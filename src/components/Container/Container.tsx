import { Grids, Grid } from './Grid';
import { defineComponent, VNode } from 'vue';

export const Container = defineComponent({
  name: 'Container',
  props: {
    grid: { default: undefined, type: String as () => Grid },
  },
  setup(props, { slots }) {
    const cssClasses = ['container', Grids[props.grid]];
    return (): VNode => <div class={cssClasses}>{slots && slots.default()}</div>;
  },
});
