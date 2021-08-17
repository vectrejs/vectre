import { defineComponent, VNode } from 'vue';

export const ModalBody = defineComponent({
  name: 'ModalBody',
  render(): VNode {
    return (
      <div class="modal-body">
        <div class="content">{this.$slots.default && this.$slots.default()}</div>
      </div>
    );
  },
});
