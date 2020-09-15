import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { flattenListener } from '../../utils/listener';
import { ModalSize, ModalSizes } from './Size';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalEvents } from './Events';

export const Modal = tsx.componentFactoryOf<ModalEvents>().create({
  name: 'Modal',
  functional: true,
  props: {
    show: { type: Boolean },
    size: { type: String as () => ModalSize, default: undefined },
    overlay: { type: Boolean, default: true },
    closeBtn: { type: Boolean, default: true },
    closeOverlay: { type: Boolean, default: true },
  },
  model: {
    prop: 'show',
    event: 'close',
  },
  render(h: CreateElement, { props, slots, listeners }): VNode {
    const close = flattenListener(listeners.close);
    const closeOverlay = props.closeOverlay
      ? close
      : (): void => {
          /*noop*/
        };

    const cssClass = ['modal', props.show && 'active', ModalSizes[props.size] || props.size];
    const overlay = props.overlay && (
      <a staticClass="modal-overlay" aria-label="Close" onClick={(): void => closeOverlay(false)} />
    );
    const _slots = slots();

    return (
      <div class={cssClass}>
        {overlay}
        <div staticClass="modal-container">
          {_slots.header && <ModalHeader onClose={props.closeBtn && close}>{_slots.header}</ModalHeader>}
          {_slots.body && <ModalBody>{_slots.body}</ModalBody>}
          {_slots.footer && <ModalFooter>{_slots.footer}</ModalFooter>}
          {_slots.default}
        </div>
      </div>
    );
  },
});
