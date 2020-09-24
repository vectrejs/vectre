import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const ModalFooter = tsx.component({
  name: 'ModalFooter',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return <div class="modal-footer">{children}</div>;
  },
});
