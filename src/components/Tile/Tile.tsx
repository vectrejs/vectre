import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';
import { IconType } from '@components/Icon';
import { TileIcon } from './TileIcon';
import { TileTitle } from './TileTitle';
import { TileSubtitle } from './TileSubtitle';
import { TileContent } from './TileContent';
import { TileAction } from './TileAction';

export const Tile = tsx.component({
  name: 'Tile',
  functional: true,
  props: {
    compact: { type: Boolean },
    title: { type: String, default: undefined },
    subtitle: { type: String, default: undefined },
    icon: { type: String as () => IconType, default: undefined },
    avatar: { type: String, default: undefined },
    initials: { type: String, default: undefined },
  },
  render(h: CreateElement, { data, slots, props }): VNode {
    const _slots = slots() || [];
    const cssClass = mergeCss(data, 'tile', { 'tile-centered': props.compact });
    const icon = (props.icon || props.avatar || props.initials || _slots.icon) && (
      <TileIcon avatar={props.avatar} icon={props.icon} initials={props.initials}>
        {_slots.icon}
      </TileIcon>
    );

    const title = props.title && <TileTitle domPropsInnerHTML={props.title} />;
    const subtitle = props.subtitle && <TileSubtitle compact={props.compact} domPropsInnerHTML={props.subtitle} />;
    const content = (_slots.content || title || subtitle) && (
      <TileContent>
        {!_slots.content && title}
        {!_slots.content && subtitle}
        {_slots.content}
      </TileContent>
    );

    const actions = _slots.actions && <TileAction>{_slots.actions}</TileAction>;

    return (
      <div class={cssClass}>
        {icon}
        {content}
        {actions}
        {_slots.default}
      </div>
    );
  },
});
