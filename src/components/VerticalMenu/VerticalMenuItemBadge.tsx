import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { Tag, TagType } from '../Tag';

export const VerticalMenuItemBadge = tsx.component({
  name: 'VerticalMenuItemBadge',
  functional: true,
  props: {
    type: { type: String as () => TagType, default: undefined },
  },
  render(h: CreateElement, { props, children }): VNode {
    return (
      <div class="menu-badge">
        <Tag type={props.type}>{children}</Tag>
      </div>
    );
  },
});
