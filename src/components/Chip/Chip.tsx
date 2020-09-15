import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { Avatar } from '../Avatar';
import { flattenListener } from '../../utils/listener';
import { ChipEvents } from './Event';

export const Chip = tsx.componentFactoryOf<ChipEvents>().create({
  name: 'Chip',
  functional: true,
  props: {
    active: { type: Boolean },
    text: { type: String, required: true },
    avatar: { type: String, default: undefined },
    initials: { type: String, default: undefined },
    small: { type: Boolean },
  },
  render(h: CreateElement, { props, listeners }): VNode {
    const cssClass = ['chip', props.active && 'active'];

    const avatar = (props.avatar || props.initials) && (
      <Avatar src={props.avatar} size={props.small ? 'sm' : undefined} initials={props.initials} />
    );
    const closeBtn = listeners.close && (
      <a staticClass="btn btn-clear" aria-label="Close" role="button" onClick={flattenListener(listeners.close)} />
    );

    return (
      <span class={cssClass}>
        {avatar}
        {props.text}
        {closeBtn}
      </span>
    );
  },
});
