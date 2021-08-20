import './styles.scss';
import { defineComponent, VNode } from 'vue';

export const FormHint = /*#__PURE__*/ defineComponent({
  name: 'FormHint',

  props: {
    error: { type: Boolean },
    success: { type: Boolean },
  },
  render(): VNode {
    return (
      <div class={['form-input-hint', this.$props.error && 'error', this.$props.success && 'success']}>
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
