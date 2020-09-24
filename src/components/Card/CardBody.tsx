import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const CardBody = tsx.component({
  name: 'CardBody',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <div staticClass="card-body">{children}</div>;
  },
});
