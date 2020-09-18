import './styles.scss';
import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const FormHint = /*#__PURE__*/ tsx.createComponent({
  name: 'FormHint',
  functional: true,
  props: {
    error: { type: Boolean },
    success: { type: Boolean },
  },
  render(h: CreateElement, { props, children, data }): VNode {
    const cssClasses = ['form-input-hint', props.error && 'error', props.success && 'success'];

    return (
      <div class={cssClasses} {...data}>
        {children}
      </div>
    );
  },
});
