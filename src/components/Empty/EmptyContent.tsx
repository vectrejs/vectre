import { CreateElement, VNode } from 'vue';

export const EmptyContent = tsx.component({
  name: 'EmptyContent',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <div staticClass="empty-content">{children}</div>;
  },
});
