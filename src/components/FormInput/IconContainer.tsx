import * as tsx from 'vue-tsx-support';
import { VNode, CreateElement } from 'vue';

export enum IconSides {
  left = 'has-icon-left',
  right = 'has-icon-right',
}
export type IconSide = keyof typeof IconSides;

export const IconContainer = tsx.component({
  name: 'FormInputIconContainer',
  functional: true,
  props: {
    side: {
      type: String as () => IconSide,
      validator: (side: IconSide): boolean => Object.keys(IconSides).includes(side),
      default: undefined,
    },
  },
  render(h: CreateElement, { props, children }): VNode {
    return <div class={IconSides[props.side as IconSide]}>{children}</div>;
  },
});
