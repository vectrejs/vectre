import { CreateElement, VNode } from 'vue';
import * as tsx from 'vue-tsx-support';

export const Horizontal = tsx.createComponent({
  name: 'FormHorizontal',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    return (
      <div class="form-horizontal" {...data}>
        {children}
      </div>
    );
  },
});
