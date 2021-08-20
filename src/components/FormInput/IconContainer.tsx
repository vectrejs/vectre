import { VNode, defineComponent, PropType } from 'vue';

export enum IconSides {
  left = 'has-icon-left',
  right = 'has-icon-right',
}
export type IconSide = keyof typeof IconSides;

export const IconContainer = defineComponent({
  name: 'FormInputIconContainer',
  props: {
    side: {
      type: String as PropType<IconSide>,
      validator: (side?: IconSide): boolean => !side || Object.keys(IconSides).includes(side),
      default: undefined,
    },
  },
  render(): VNode {
    return <div class={IconSides[this.side as IconSide]}>{this.$slots.default && this.$slots.default()}</div>;
  },
});
