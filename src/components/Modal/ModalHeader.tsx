import { defineComponent, VNode } from 'vue';
// import { flattenListener } from '../../utils/listener';
import { Btn } from '../Btn';

export const ModalHeader = /*#__PURE__*/ defineComponent({
  name: 'ModalHeader',
  props: {
    onClose: { type: [Boolean, Function], default: undefined },
  },
  emits: ['close'],
  render(): VNode {
    const close = this.onClose && (
      <Btn class="float-right" aria-label="Close" type="clear" onClick={(): void => this.onClose(false)} />
    );

    return (
      <div class="modal-header">
        {close}
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
