import { defineComponent, VNode } from 'vue';
import { IconType, Icon } from '../Icon';
import { mergeCss } from '../../utils/css';
import { Avatar } from '../Avatar';
import './icon-styles.scss';
import { hasSlot } from '../../utils/component';

export const TileIcon = defineComponent({
  name: 'TileIcon',
  props: {
    icon: { type: String as () => IconType, default: undefined },
    avatar: { type: String, default: undefined },
    initials: { type: String, default: undefined },
  },
  render(): VNode {
    const cssClass = mergeCss(this.$attrs, 'tile-icon');
    const avatar = (this.$props.avatar || this.$props.initials) && (
      <Avatar initials={this.$props.initials} src={this.$props.avatar} size="lg" />
    );
    const icon = this.$props.icon && <Icon name={this.$props.icon} size="x2" />;
    const hasDefaultSlot = hasSlot(this.$slots, 'default');

    return (
      <div {...this.$attrs} class={cssClass}>
        {hasDefaultSlot && this.$slots.default()}
        {!hasDefaultSlot && (avatar || icon)}
      </div>
    );
  },
});
