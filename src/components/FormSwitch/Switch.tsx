import { defineComponent, VNode } from 'vue';
import { FormCheckbox } from '../FormCheckbox';

export const FormSwitch = /*#__PURE__*/ defineComponent({
  name: 'FormSwitch',
  extends: FormCheckbox,
  emits: ['change', 'update:modelValue'],
  render(): VNode {
    const handleChange = (value: any): void => {
      this.$emit('change', value);
      this.$emit('update:modelValue', value);
    };

    return (
      <FormCheckbox {...this.$props} onChange={handleChange} type="switch">
        {this.$slots.default && this.$slots.default()}
      </FormCheckbox>
    );
  },
});
