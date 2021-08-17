import { defineComponent, VNode } from 'vue';

export const ModalFooter = defineComponent({
  name: 'ModalFooter',
  render(): VNode {
    return <div class="modal-footer">{this.$slots.default && this.$slots.default()}</div>;
  },
});
