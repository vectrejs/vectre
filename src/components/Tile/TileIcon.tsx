import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { IconType, Icon } from '../Icon';
import { mergeCss } from '../../utils/css';
import { Avatar } from '../Avatar';
import './icon-styles.scss';

export const TileIcon = tsx.component({
  name: 'TileIcon',
  functional: true,
  props: {
    icon: { type: String as () => IconType, default: undefined },
    avatar: { type: String, default: undefined },
    initials: { type: String, default: undefined },
  },
  render(h: CreateElement, { data, props, children = [] }): VNode {
    const cssClass = mergeCss(data, 'tile-icon');
    const avatar = (props.avatar || props.initials) && (
      <Avatar initials={props.initials} src={props.avatar} size="lg" />
    );
    const icon = props.icon && <Icon type={props.icon} size="x2" />;

    return (
      <div class={cssClass} {...data}>
        {children}
        {!children.length && avatar}
        {!children.length && icon}
      </div>
    );
  },
});
