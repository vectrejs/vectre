import { CreateElement, VNode } from 'vue';
import * as tsx from 'vue-tsx-support';
import { AvatarSize, AvatarSizes } from './Size';
import { AvatarPresence } from './Presence';
import './style.scss';

export const Avatar = tsx.component({
  name: 'Avatar',
  functional: true,
  props: {
    size: { type: String as () => AvatarSize, default: undefined },
    src: { type: String, default: undefined },
    initials: { type: String, default: undefined },
    background: { type: String, default: undefined },
    color: { type: String, default: undefined },
    alt: { type: String, default: undefined },
    presence: { type: String as () => AvatarPresence, default: undefined },
    icon: { type: String, default: undefined },
  },
  render(h: CreateElement, { props, data }): VNode {
    const cssClass = ['avatar', AvatarSizes[props.size] || props.size];
    const cssStyles = { color: props.color, background: props.background };
    const initials = props.initials && props.initials.trim().substring(0, 2);

    return (
      <figure {...data} class={cssClass} style={cssStyles} data-initial={initials}>
        {props.src && <img src={props.src} alt={props.alt} />}
        {props.icon && <img src={props.icon} staticClass="avatar-icon" />}
        {props.presence && !props.icon && <i class={props.presence} staticClass="avatar-presence" />}
      </figure>
    );
  },
});
