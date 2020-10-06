import * as tsx from 'vue-tsx-support';
import './styles.scss';
import { CreateElement, VNode } from 'vue';
import { BtnType, BtnTypes } from './Type';
import { BtnSizes, BtnSize } from './Size';
import { BtnState, BtnStates } from './State';
import { IconType } from '../Icon';
import { Icon } from '../Icon/Icon';
import { BtnEvents } from './Events';
import { mergeCss } from '../../utils/css';

export const Btn = /*#__PURE__*/ tsx.componentFactoryOf<BtnEvents>().create({
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
    htmlTag: {
      type: String as () => 'a' | 'button',
      validator: (tag: 'a' | 'button'): boolean => ['a', 'button'].includes(tag),
    },
  },
  render(h: CreateElement, { props, data, slots }): VNode {
    const cssClass = mergeCss(data, 'btn', [
      BtnTypes[props.type as BtnType] || props.type,
      BtnSizes[props.size] || props.size,
      BtnStates[props.state] || props.state,
      props.action && props.circle && 's-circle',
      props.action && 'btn-action',
    ]);

    const leftIcon = props.icon && props.left ? <Icon name={props.icon} class="left" /> : '';
    const rightIcon = props.icon && !props.left ? <Icon name={props.icon} /> : '';
    const content = !props.action && slots().default;
    const htmlTag = ['a', 'button'].includes(props.htmlTag) ? props.htmlTag : 'button';

    return h(htmlTag, { ...data, class: cssClass, attrs: { tabindex: props.tabindex, ...data.attrs } }, [
      leftIcon,
      content,
      rightIcon,
    ]);
  },
});
