import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { BtnType, BtnTypes, Btn, BtnState } from '../Btn';
import { IconType } from '../Icon';
import { flattenListener } from '../../utils/listener';
import { VerticalMenu } from '../VerticalMenu';

export const DropdownMenu = /*#__PURE__*/ tsx.component({
  name: 'DropdownMenu',
  functional: true,
  props: {
    items: { type: [Object, Array], default: undefined },
    right: { type: Boolean },
    btnType: { type: String as () => BtnType, default: undefined },
    btnText: { type: String, default: undefined },
    btnIcon: { type: String as () => IconType, default: undefined },
    state: { type: String as () => BtnState, default: undefined },
  },
  render(h: CreateElement, { props, listeners, scopedSlots }): VNode {
    const onOpen = (): ((event: any) => void) => flattenListener(listeners.opened);
    const onClose = (): ((event: any) => void) => flattenListener(listeners.closed);
    const btnCssClass = ['dropdown-toggle', BtnTypes[props.btnType]];
    const btn = (
      <Btn
        class={btnCssClass}
        tabindex="0"
        icon={props.btnIcon || 'caret'}
        state={props.state}
        onFocus={onOpen}
        onBlur={onClose}
      >
        {props.btnText}
      </Btn>
    );

    return (
      <div staticClass="dropdown" class={props.right && 'dropdown-right'}>
        {btn}
        <VerticalMenu items={props.items} scopedSlots={{ default: scopedSlots.default }} />
      </div>
    );
  },
});
