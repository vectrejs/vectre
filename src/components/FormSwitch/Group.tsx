import { defineComponent, VNode } from 'vue';
import { FormCheckboxGroup } from '../FormCheckbox';

export const FormSwitchGroup = /*#__PURE__*/ defineComponent({
  name: 'FormSwitchGroup',
  extends: FormCheckboxGroup,
  emits: ['change', 'update:modelValue'],
  render(): VNode {
    const handleChange = (value: any): void => {
      this.$emit('change', value);
      this.$emit('update:modelValue', value);
    };

    return (
      <FormCheckboxGroup {...this.$props} type="switch" onChange={handleChange}>
        {this.$slots.default && this.$slots.default()}
      </FormCheckboxGroup>
    );
  },
});
