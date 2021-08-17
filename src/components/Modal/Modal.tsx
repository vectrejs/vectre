import { defineComponent, VNode } from 'vue';
import { flattenListener } from '../../utils/listener';
import { ModalSize, ModalSizes } from './Size';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { Overlay } from '../Overlay';
import './styles.scss';

export const Modal = /*#__PURE__*/ defineComponent({
  name: 'Modal',
  model: {
    prop: 'show',
    event: 'close',
  },
  props: {
    modelValue: { type: Boolean },
    size: { type: String as () => ModalSize, default: undefined },
    overlay: { type: [Boolean, String, Number], default: true },
    closeBtn: { type: Boolean, default: true },
    closeOverlay: { type: Boolean, default: true },
    noScroll: { type: Boolean, default: true },
    onClose: { type: Function, default: undefined },
  },
  emits: ['close', 'update:modelValue'],
  render(): VNode {
    const cssClass = ['modal', this.modelValue && 'active', ModalSizes[this.size] || this.size];
    const opacity = typeof this.overlay !== 'boolean' ? this.overlay : undefined;
    const close = flattenListener([this.onClose, (): void => this.$emit('update:modelValue', !this.modelValue)]);

    return (
      <Overlay
        show={this.modelValue && !!this.overlay}
        onClick={(): void => this.closeOverlay && close(false)}
        noScroll={this.noScroll}
        opacity={opacity}
        class={cssClass}
        z-index="201"
        fullscreen
      >
        <div class="modal-container">
          {this.$slots.header && <ModalHeader onClose={this.closeBtn && close}>{this.$slots.header()}</ModalHeader>}
          {this.$slots.body && <ModalBody>{this.$slots.body()}</ModalBody>}
          {this.$slots.footer && <ModalFooter>{this.$slots.footer()}</ModalFooter>}
          {this.$slots.default && this.$slots.default()}
        </div>
      </Overlay>
    );
  },
});
