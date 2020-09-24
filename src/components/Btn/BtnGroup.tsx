import { CreateElement, VNode } from 'vue';
import * as tsx from 'vue-tsx-support';

export const BtnGroup = tsx.component({
  name: 'BtnGroup',
  functional: true,
  props: {
    block: { type: Boolean },
  },
  render(h: CreateElement, { props, data, slots }): VNode {
    const cssClass: string[] = ['btn-group', props.block && 'btn-group-block'];

    return (
      <div class={cssClass} {...data}>
        {slots().default}
      </div>
    );
  },
});
