import * as tsx from 'vue-tsx-support';
import { Prop, Component } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';

export enum IconSide {
  left = 'has-icon-left',
  right = 'has-icon-right',
}
type IconSides = keyof typeof IconSide;

interface Props {
  side: IconSides;
}

@Component
export class IconContainer extends tsx.Component<Props> {
  @Prop({
    type: String,
    validator: side => Object.keys(IconSide).includes(side),
  })
  public side: IconSides;

  public render(h: CreateElement): VNode {
    return <div class={IconSide[this.side as IconSides]}>{this.$slots.default}</div>;
  }
}
