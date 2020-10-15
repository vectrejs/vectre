import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { flattenListener } from '../../utils/listener';
import { ModalSize, ModalSizes } from './Size';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalEvents } from './Events';
import { Overlay } from '../Overlay';
import './styles.scss';

export const Modal = /*#__PURE__*/ tsx.componentFactoryOf<ModalEvents>().create({
  name: 'Modal',
  props: {
    show: { type: Boolean },
    size: { type: String as () => ModalSize, default: undefined },
    overlay: { type: [Boolean, String, Number], default: true },
    closeBtn: { type: Boolean, default: true },
    closeOverlay: { type: Boolean, default: true },
    noScroll: { type: Boolean, default: true },
  },
  model: {
    prop: 'show',
    event: 'close',
  },

  render(h: CreateElement): VNode {
    const cssClass = ['modal', this.show && 'active', ModalSizes[this.size] || this.size];
    const opacity = typeof this.overlay !== 'boolean' ? this.overlay : undefined;
    const close = flattenListener(this.$listeners.close);

    return (
      <Overlay
        show={this.show && !!this.overlay}
        onClick={(): void => this.closeOverlay && close(false)}
        noScroll={this.noScroll}
        opacity={opacity}
        class={cssClass}
        z-index="201"
        fullscreen
      >
        <div staticClass="modal-container">
          {this.$slots.header && <ModalHeader onClose={this.closeBtn && close}>{this.$slots.header}</ModalHeader>}
          {this.$slots.body && <ModalBody>{this.$slots.body}</ModalBody>}
          {this.$slots.footer && <ModalFooter>{this.$slots.footer}</ModalFooter>}
          {this.$slots.default}
        </div>
      </Overlay>
    );
  },
});
