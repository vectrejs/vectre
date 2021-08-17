import { defineComponent, VNode } from 'vue';
import { Icon, IconType } from '../Icon';

export const EmptyIcon = defineComponent({
  name: 'EmptyIcon',
  props: {
    icon: { type: String as () => IconType, required: true },
  },
  render(): VNode {
    return (
      <div class="empty-icon">
        <Icon name={this.$props.icon} size="x3" />
      </div>
    );
  },
});
