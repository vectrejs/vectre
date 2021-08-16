import { CreateElement, VNode } from 'vue';
import { FormCheckboxGroup } from '../FormCheckbox';

export const FormSwitchGroup = tsx.extendFrom(FormCheckboxGroup).create({
  name: 'FormSwitchGroup',
  functional: true,
  render(h: CreateElement, { data, children, props }): VNode {
    return (
      <FormCheckboxGroup {...{ ...data, props: { ...(props as Record<string, any>), type: 'switch' } }}>
        {children}
      </FormCheckboxGroup>
    );
  },
});
