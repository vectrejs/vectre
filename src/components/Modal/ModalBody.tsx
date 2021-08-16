import { CreateElement, VNode } from 'vue';

export const ModalBody = tsx.component({
  name: 'ModalBody',
  functional: true,
  render(h: CreateElement, { children }): VNode {
    return (
      <div class="modal-body">
        <div class="content">{children}</div>
      </div>
    );
  },
});
