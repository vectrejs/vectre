import { defineComponent, PropType, VNode } from 'vue';
import { CommonOptions } from './Options';

const isFormComponent = (tag = ''): boolean =>
  /^.*Form(Label|Input|Select|Switch|SwitchGroup|CheckboxGroup|Checkbox|RadioGroup|Radio|Slider)$/i.test(tag);

export const FormGroup = /*#__PURE__*/ defineComponent({
  name: 'FormGroup',

  props: {
    size: {
      type: String as PropType<'lg' | 'sm'>,
      validator: (v: string): boolean => !v || ['lg', 'sm'].includes(v),
      default: undefined,
    },
    disabled: { type: Boolean },
    error: { type: Boolean },
    success: { type: Boolean },
  },
  render(): VNode {
    const children = (this.$slots.default && this.$slots.default()) || [];
    const groupItems = children.filter(({ type }) => {
      if (typeof type === 'object' && 'name' in type) {
        return isFormComponent(type.name);
      }
    });

    if (this.$props.size) {
      groupItems.forEach((child: VNode & CommonOptions) => {
        if (!child.props) {
          child.props = {};
        }

        child.props.size = this.$props.size;
      });
    }

    if (this.$props.disabled !== undefined) {
      groupItems.forEach((child: VNode & CommonOptions) => {
        if (!child.props) {
          child.props = {};
        }

        child.props.disabled = this.$props.disabled;
      });
    }

    return (
      <div class={['form-group', this.$props.error && 'has-error', this.$props.success && 'has-success']}>
        {children}
      </div>
    );
  },
});
