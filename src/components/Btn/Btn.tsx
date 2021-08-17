import './styles.scss';
import { defineComponent, h, PropType, VNode } from 'vue';
import { BtnType, BtnTypes } from './Type';
import { BtnSizes, BtnSize } from './Size';
import { BtnState, BtnStates } from './State';
import { IconType } from '../Icon';
import { Icon } from '../Icon/Icon';
import { mergeCss } from '../../utils/css';

export const Btn = /*#__PURE__*/ defineComponent({
  name: 'Btn',
  props: {
    type: { type: String as PropType<BtnType>, default: undefined },
    size: { type: String as PropType<BtnSize>, default: undefined },
    icon: { type: String as PropType<IconType>, default: undefined },
    state: { type: String as PropType<BtnState>, default: undefined },
    tabindex: { type: [Number, String], default: undefined },
    left: { type: Boolean },
    circle: { type: Boolean },
    action: { type: Boolean },
    htmlTag: {
      type: String as PropType<'a' | 'button'>,
      validator: (tag: 'a' | 'button'): boolean => ['a', 'button'].includes(tag),
      default: 'button',
    },
    onClick: { type: Function, default: undefined },
    onBlur: { type: Function, default: undefined },
    onFocus: { type: Function, default: undefined },
  },
  emits: ['click', 'focus', 'blur'],
  render(): VNode {
    const cssClass = mergeCss(this.$attrs, 'btn', [
      BtnTypes[this.$props.type] || this.$props.type,
      BtnSizes[this.$props.size] || this.$props.size,
      BtnStates[this.$props.state] || this.$props.state,
      this.$props.action && this.$props.circle && 's-circle',
      this.$props.action && 'btn-action',
    ]);

    const leftIcon = this.$props.icon && this.$props.left ? <Icon name={this.$props.icon} class="left" /> : '';
    const rightIcon = this.$props.icon && !this.$props.left ? <Icon name={this.$props.icon} /> : '';
    const content = !this.$props.action && this.$slots.default && this.$slots.default();
    const htmlTag = ['a', 'button'].includes(this.$props.htmlTag) ? this.$props.htmlTag : 'button';

    return h(
      htmlTag,
      {
        ...this.$attrs,
        class: cssClass,
        tabindex: this.$props.tabindex,
        onClick: this.onClick,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
      },
      [leftIcon, content, rightIcon],
    );
  },
});
