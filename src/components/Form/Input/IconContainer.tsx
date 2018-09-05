import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';

export enum IconSide {
  left = 'has-icon-left',
  right = 'has-icon-right',
}

interface IProps {
  side: 'left' | 'right';
}

@Component
export class IconContainer extends VueComponent<IProps> {
  @Prop()
  public side: 'left' | 'right';

  public render() {
    return <div class={IconSide[this.side as any]}>{this.$slots.default}</div>;
  }
}
