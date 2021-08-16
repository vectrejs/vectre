import { CreateElement, VNode } from 'vue';
import { FormCheckbox } from '../FormCheckbox';

export const FormSwitch = tsx.extendFrom(FormCheckbox).create({
  name: 'FormSwitch',
  functional: true,
  render(h: CreateElement, { data, children, props }): VNode {
    return (
      <FormCheckbox {...{ ...data, props: { ...(props as Record<string, any>), type: 'switch' } }}>
        {children}
      </FormCheckbox>
    );
  },
});
