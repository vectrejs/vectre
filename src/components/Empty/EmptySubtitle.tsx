import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const EmptySubtitle = tsx.component({
  name: 'EmptySubtitle',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <p staticClass="empty-title">{children}</p>;
  },
});
