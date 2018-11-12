import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';

type IconSides = keyof typeof IconSide;

export enum IconSide {
  left = 'has-icon-left',
  right = 'has-icon-right',
}

interface IProps {
  side: IconSides;
}

@Component
export class IconContainer extends VueComponent<IProps> {
  @Prop({
    type: String,
    validator: side => Object.keys(IconSide).includes(side),
  })
  public side: IconSides;

  public render(h: CreateElement): VNode {
    return <div class={IconSide[this.side as any]}>{this.$slots.default}</div>;
  }
}
