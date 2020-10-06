import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode, VNodeDirective } from 'vue';
import { BtnType, BtnTypes, Btn, BtnState } from '../Btn';
import { IconType } from '../Icon';
import { VerticalMenu } from '../VerticalMenu';
import { ClickOutside } from '../../directives/ClickOutside';
import { flattenListener } from '../../utils/listener';

export const DropdownMenu = /*#__PURE__*/ tsx.component({
  name: 'DropdownMenu',
  directives: {
    ClickOutside,
  },
  props: {
    items: { type: [Object, Array], default: undefined },
    right: { type: Boolean },
    btnType: { type: String as () => BtnType, default: undefined },
    btnText: { type: String, default: undefined },
    btnIcon: { type: String as () => IconType, default: undefined },
    state: { type: String as () => BtnState, default: undefined },
  },
  render(h: CreateElement): VNode {
    const onOpen = flattenListener(this.$listeners.opened);
    const onClose = flattenListener(this.$listeners.closed);
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

    const directives: VNodeDirective[] = [
      {
        name: 'click-outside',
        value: (): void => (btn.elm as HTMLElement).blur(),
        modifiers: { touch: false },
      },
    ];

    return (
      <div {...{ directives }} staticClass="dropdown" class={this.right && 'dropdown-right'}>
        {btn}
        <VerticalMenu items={this.items} scopedSlots={{ default: this.$scopedSlots.default }} />
      </div>
    );
  },
});
