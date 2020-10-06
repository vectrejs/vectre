import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode, VNodeDirective } from 'vue';
import { flattenListener } from '../../utils/listener';
import { ModalSize, ModalSizes } from './Size';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalEvents } from './Events';
import { Overlay } from '../../directives/Overlay';
import './styles.scss';

export const Modal = /*#__PURE__*/ tsx.componentFactoryOf<ModalEvents>().create({
  name: 'Modal',
  directives: {
    Overlay,
  },
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
  watch: {
    show(value): void {
      if (!this.noScroll) return;

      if (value) {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
      } else {
        document.body.style.position = '';
        window.scrollTo({ top: +document.body.style.top.match(/\d+/)[0] });
      }
    },
  },
  render(h: CreateElement): VNode {
    const cssClass = ['modal', this.show && 'active', ModalSizes[this.size] || this.size];
    const close = flattenListener(this.$listeners.close);
    const directives: VNodeDirective[] = [];

    if (this.overlay) {
      const opacity = typeof this.overlay === 'boolean' ? '75' : String(this.overlay);

      directives.push({
        name: 'overlay',
        arg: opacity,
        value: (): void => this.closeOverlay && close(false),
      });
    }

    return (
      <div class={cssClass} {...{ directives }}>
        <div staticClass="modal-container">
          {this.$slots.header && <ModalHeader onClose={this.closeBtn && close}>{this.$slots.header}</ModalHeader>}
          {this.$slots.body && <ModalBody>{this.$slots.body}</ModalBody>}
          {this.$slots.footer && <ModalFooter>{this.$slots.footer}</ModalFooter>}
          {this.$slots.default}
        </div>
      </div>
    );
  },
});
