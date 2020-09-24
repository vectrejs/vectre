import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const EmptyAction = tsx.component({
  name: 'EmptyAction',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <p staticClass="empty-action">{children}</p>;
  },
});
