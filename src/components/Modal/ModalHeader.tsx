import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { flattenListener } from '../../utils/listener';
import { Btn } from '../Btn';
import { ModalEvents } from './Events';

export const ModalHeader = tsx.componentFactoryOf<ModalEvents>().create({
  name: 'ModalHeader',
  functional: true,
  render(h: CreateElement, { children, listeners }): VNode {
    const close = listeners.close && (
      <Btn
        staticClass="float-right"
        aria-label="Close"
        type="clear"
        onClick={(): void => flattenListener(listeners.close)(false)}
      />
    );

    return (
      <div class="modal-header">
        {close}
        {children}
      </div>
    );
  },
});
