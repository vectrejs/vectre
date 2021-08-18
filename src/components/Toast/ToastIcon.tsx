import { defineComponent, VNode } from 'vue';
import { IconType, Icon } from '../Icon';

export const ToastIcon = defineComponent({
  name: 'ToastIcon',

  props: {
    icon: { type: String as () => IconType, required: true },
    large: { type: Boolean, default: false },
  },
  render(): VNode {
    return (
      <div class={['toast-icon', this.$props.large && 'large']}>
        <Icon name={this.$props.icon} size={this.$props.large ? 'x2' : undefined} />
      </div>
    );
  },
});
