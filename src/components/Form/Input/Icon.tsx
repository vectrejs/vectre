import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { Icons, IconType } from '../../Icon';
import { VNode, CreateElement } from 'vue';

interface IIconProps {
  icon: string;
}

@Component
export class Icon extends VueComponent<IIconProps> {
  @Prop()
  public icon: string;

  public render(h: CreateElement): VNode {
    return <i class={['form-icon', 'icon', Icons[this.icon as IconType]]} />;
  }
}
