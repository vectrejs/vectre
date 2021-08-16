import { Icons, IconType } from '../Icon';
import { VNode, CreateElement } from 'vue';

export const Icon = tsx.component({
  name: 'FormInputIcon',
  functional: true,
  props: {
    icon: { type: String, default: undefined },
  },
  render(h: CreateElement, { props }): VNode {
    return <i class={['form-icon', 'icon', Icons[props.icon as IconType]]} />;
  },
});
