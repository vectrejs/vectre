import { defineComponent, PropType, VNode } from 'vue';
import { IconType } from '../Icon';
import { EmptyTitle } from './EmptyTitle';
import { EmptySubtitle } from './EmptySubtitle';
import { EmptyIcon } from './EmptyIcon';
import { EmptyContent } from './EmptyContent';
import { EmptyAction } from './EmptyAction';

export const Empty = defineComponent({
  name: 'Empty',
  props: {
    icon: { type: String as PropType<IconType>, default: undefined },
    title: { type: String, default: undefined },
    sub: { type: String, default: undefined },
  },
  render(): VNode {
    const title = this.$props.title && <EmptyTitle>{this.$props.title}</EmptyTitle>;
    const sub = this.$props.sub && <EmptySubtitle>{this.$props.sub}</EmptySubtitle>;
    const icon = this.$props.icon && <EmptyIcon icon={this.$props.icon} />;

    const content = this.$slots.content && <EmptyContent>{this.$slots.content()}</EmptyContent>;
    const actions = this.$slots.action && <EmptyAction>{this.$slots.action()}</EmptyAction>;

    return (
      <div class="empty">
        {icon}
        {title}
        {sub}
        {content}
        {actions}
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
