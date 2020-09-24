import * as tsx from 'vue-tsx-support';
import './styles.scss';
import { CreateElement, VNode } from 'vue';
import { BtnType, BtnTypes } from './Type';
import { BtnSizes, BtnSize } from './Size';
import { BtnState, BtnStates } from './State';
import { IconType } from '../Icon';
import { Icon } from '../Icon/Icon';
import { BtnEvents } from './Events';

export const Btn = tsx.componentFactoryOf<BtnEvents>().create({
  name: 'Btn',
  functional: true,
  props: {
    type: { type: String as () => BtnType },
    size: { type: String as () => BtnSize },
    icon: { type: String as () => IconType },
    state: { type: String as () => BtnState },
    tabindex: { type: [Number, String], default: undefined },
    left: { type: Boolean },
    circle: { type: Boolean },
    action: { type: Boolean },
  },
  render(h: CreateElement, { props, data, slots }): VNode {
    const cssClass = [
      'btn',
      BtnTypes[props.type as BtnType] || props.type,
      BtnSizes[props.size] || props.size,
      BtnStates[props.state] || props.state,
      props.action && props.circle && 's-circle',
      props.action && 'btn-action',
    ];

    const leftIcon = props.icon && props.left ? <Icon name={props.icon} class="left" /> : '';
    const rightIcon = props.icon && !props.left ? <Icon name={props.icon} /> : '';
    const content = !props.action && slots().default;

    return (
      <button class={cssClass} {...data}>
        {leftIcon}
        {content}
        {rightIcon}
      </button>
    );
  },
});
