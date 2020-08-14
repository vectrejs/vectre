import { Grids, Grid } from './Grid';
import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const Container = tsx.createComponent({
  name: 'Container',
  functional: true,
  props: {
    grid: { type: String as () => Grid },
  },
  render(h: CreateElement, { props, children, data }): VNode {
    const cssClasses = ['container', Grids[props.grid as Grid]];

    return (
      <div class={cssClasses} {...data}>
        {children}
      </div>
    );
  },
});
