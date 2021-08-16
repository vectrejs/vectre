import { CreateElement, VNode } from 'vue';
export const FormHorizontal = tsx.createComponent({
  name: 'FormHorizontal',
  functional: true,
  render(h: CreateElement, { children, data }): VNode {
    return (
      <div class="form-horizontal" {...data}>
        {children}
      </div>
    );
  },
});
