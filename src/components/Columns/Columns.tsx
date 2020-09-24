import { CreateElement, VNode } from 'vue';
import * as tsx from 'vue-tsx-support';

export const Columns = tsx.createComponent({
  name: 'Columns',
  functional: true,
  props: {
    gapless: Boolean,
    oneline: Boolean,
  },
  render(h: CreateElement, { props, children, data }): VNode {
    const cssClasses = ['columns', props.gapless && 'col-gapless', props.oneline && 'col-oneline'];

    return (
      <div class={cssClasses} {...data}>
        {children}
      </div>
    );
  },
});
