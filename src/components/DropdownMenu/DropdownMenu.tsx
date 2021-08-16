import { VNode, defineComponent, PropType } from 'vue';
import { BtnType, BtnTypes, Btn, BtnState } from '../Btn';
import { IconType } from '../Icon';
import { VerticalMenu } from '../VerticalMenu';
import { ClickOutside } from '../../directives/ClickOutside';
import { flattenListener } from '../../utils/listener';

export const DropdownMenu = /*#__PURE__*/ defineComponent({
  name: 'DropdownMenu',
  directives: {
    ClickOutside,
  },
  props: {
    items: { type: [Object, Array], default: undefined },
    right: { type: Boolean },
    btnType: { type: String as PropType<BtnType>, default: undefined },
    btnText: { type: String, default: undefined },
    btnIcon: { type: String as PropType<IconType>, default: undefined },
    state: { type: String as PropType<BtnState>, default: undefined },
    onOpened: { type: Function, default: undefined },
    onClosed: { type: Function, default: undefined },
  },
  emits: ['opened', 'closed'],
  render(): VNode {
    const onOpen = flattenListener(this.onOpened);
    const onClose = flattenListener(this.onClosed);
    const btnCssClass = [BtnTypes[this.btnType], 'dropdown-toggle'];
    const btn = (
      <Btn
        class={btnCssClass}
        icon={this.btnIcon || 'caret'}
        state={this.state}
        onFocus={onOpen}
        onBlur={onClose}
        htmlTag="a"
        tabindex="0"
      >
        {this.btnText}
      </Btn>
    );

    const slots: Record<string, () => VNode[]> = {};
    if (this.$slots.default) {
      slots.item = (item?: any): VNode[] => this.$slots.default && this.$slots.default(item);
    }

    return (
      <div
        class={['dropdown', this.right && 'dropdown-right']}
        v-click-outside={[(): void => (btn.el as HTMLElement).blur()]}
      >
        {btn}
        <VerticalMenu items={this.$props.items} v-slots={slots}></VerticalMenu>
      </div>
    );
  },
});
