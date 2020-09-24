import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const CardFooter = tsx.component({
  name: 'CardFooter',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <div staticClass="card-footer">{children}</div>;
  },
});
