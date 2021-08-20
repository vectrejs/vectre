import { VNode, defineComponent } from 'vue';

export const Loading = defineComponent({
  name: 'FormInputLoading',

  render(): VNode {
    return <i class="form-icon loading" />;
  },
});
