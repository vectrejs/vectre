import { defineComponent, PropType, VNode } from 'vue';
import { AvatarSize, AvatarSizes } from './Size';
import { AvatarPresence } from './Presence';
import './style.scss';

export const Avatar = defineComponent({
  name: 'Avatar',
  functional: true,
  props: {
    size: { type: String as PropType<AvatarSize>, default: undefined },
    src: { type: String, default: undefined },
    initials: { type: String, default: undefined },
    background: { type: String, default: undefined },
    color: { type: String, default: undefined },
    alt: { type: String, default: undefined },
    presence: { type: String as PropType<AvatarPresence>, default: undefined },
    icon: { type: String, default: undefined },
  },
  render(): VNode {
    const cssClass = ['avatar', AvatarSizes[this.$props.size] || this.$props.size];
    const cssStyles = { color: this.$props.color, background: this.$props.background };
    const initials = this.$props.initials && this.$props.initials.trim().substring(0, 2);

    return (
      <figure {...this.$attrs} class={cssClass} style={cssStyles} data-initial={initials}>
        {this.$props.src && <img src={this.$props.src} alt={this.$props.alt} />}
        {this.$props.icon && <img src={this.$props.icon} class="avatar-icon" />}
        {this.$props.presence && !this.$props.icon && <i class={(this.$props.presence, 'avatar-presence')} />}
      </figure>
    );
  },
});
