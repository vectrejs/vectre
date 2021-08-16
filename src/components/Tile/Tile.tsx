import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';
import { IconType } from '@components/Icon';
import { TileIcon } from './TileIcon';
import { TileTitle } from './TileTitle';
import { TileSubtitle } from './TileSubtitle';
import { TileContent } from './TileContent';
import { TileAction } from './TileAction';

export const Tile = defineComponent({
  name: 'Tile',
  props: {
    compact: { type: Boolean },
    title: { type: String, default: undefined },
    subtitle: { type: String, default: undefined },
    icon: { type: String as () => IconType, default: undefined },
    avatar: { type: String, default: undefined },
    initials: { type: String, default: undefined },
  },
  render(): VNode {
    const cssClass = mergeCss(this.$attrs, 'tile', { 'tile-centered': this.$props.compact });
    const icon = (this.$props.icon || this.$props.avatar || this.$props.initials || this.$slots.icon) && (
      <TileIcon avatar={this.$props.avatar} icon={this.$props.icon} initials={this.$props.initials}>
        {this.$slots.icon && this.$slots.icon()}
      </TileIcon>
    );

    const title = this.$props.title && <TileTitle v-html={this.$props.title} />;
    const subtitle = this.$props.subtitle && (
      <TileSubtitle compact={this.$props.compact} v-html={this.$props.subtitle} />
    );
    const content = (this.$slots.content || title || subtitle) && (
      <TileContent>
        {!this.$slots.content && title}
        {!this.$slots.content && subtitle}
        {this.$slots.content && this.$slots.content()}
      </TileContent>
    );

    const actions = this.$slots.actions && <TileAction>{this.$slots.actions()}</TileAction>;

    return (
      <div class={cssClass}>
        {icon}
        {content}
        {actions}
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
