import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const CardHeader = tsx.component({
  name: 'CardHeader',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <div staticClass="card-header">{children}</div>;
  },
});
