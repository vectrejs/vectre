import { CreateElement, VNode } from 'vue';
import { IconType } from '../Icon';
import { EmptyTitle } from './EmptyTitle';
import { EmptySubtitle } from './EmptySubtitle';
import { EmptyIcon } from './EmptyIcon';
import { EmptyContent } from './EmptyContent';
import { EmptyAction } from './EmptyAction';

export const Empty = tsx.component({
  name: 'Empty',
  functional: true,
  props: {
    icon: { type: String as () => IconType, default: undefined },
    title: { type: String as () => IconType, default: undefined },
    sub: { type: String as () => IconType, default: undefined },
  },
  render(h: CreateElement, { props, slots }): VNode {
    const title = props.title && <EmptyTitle>{props.title}</EmptyTitle>;
    const sub = props.sub && <EmptySubtitle>{props.sub}</EmptySubtitle>;
    const icon = props.icon && <EmptyIcon icon={props.icon} />;

    const _slots = slots();
    const content = _slots.content && <EmptyContent>{_slots.content}</EmptyContent>;
    const actions = _slots.action && <EmptyAction>{_slots.action}</EmptyAction>;

    return (
      <div staticClass="empty">
        {icon}
        {title}
        {sub}
        {content}
        {actions}
        {_slots.default}
      </div>
    );
  },
});
