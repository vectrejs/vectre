import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const Card = tsx.component({
  name: 'Card',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <div staticClass="card">{children}</div>;
  },
});
