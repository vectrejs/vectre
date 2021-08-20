import { Icons, IconType } from '../Icon';
import { VNode, defineComponent } from 'vue';

export const Icon = defineComponent({
  name: 'FormInputIcon',
  props: {
    icon: { type: String, default: undefined },
  },
  render(): VNode {
    return <i class={['form-icon', 'icon', Icons[this.icon as IconType]]} />;
  },
});
