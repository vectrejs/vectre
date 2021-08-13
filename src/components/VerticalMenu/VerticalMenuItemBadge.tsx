import { defineComponent, PropType, VNode } from 'vue';
import { Tag, TagType } from '../Tag';

export const VerticalMenuItemBadge = defineComponent({
  name: 'VerticalMenuItemBadge',
  props: {
    type: { type: String as PropType<TagType>, default: undefined },
  },
  render(): VNode {
    return (
      <div class="menu-badge">
        <Tag type={this.$props.type}>{this.$slots.default && this.$slots.default()}</Tag>
      </div>
    );
  },
});
