import { CreateElement, VNode } from 'vue';

export const EmptyTitle = tsx.component({
  name: 'EmptyTitle',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <p staticClass="empty-title h5">{children}</p>;
  },
});
