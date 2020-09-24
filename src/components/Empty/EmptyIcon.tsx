import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { Icon, IconType } from '../Icon';

export const EmptyIcon = tsx.component({
  name: 'EmptyIcon',
  functional: true,
  props: {
    icon: { type: String as () => IconType, required: true },
  },
  render(h: CreateElement, { props }): VNode {
    return (
      <div staticClass="empty-icon">
        <Icon name={props.icon} size="x3" />
      </div>
    );
  },
});
