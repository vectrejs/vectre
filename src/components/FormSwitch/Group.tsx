import { defineComponent, VNode } from 'vue';
import { FormCheckboxGroup } from '../FormCheckbox';

export const FormSwitchGroup = defineComponent({
  name: 'FormSwitchGroup',
  extends: FormCheckboxGroup,
  render(): VNode {
    const handleChange = (value: any) => {
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
