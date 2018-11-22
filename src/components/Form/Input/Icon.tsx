import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { Icons } from '../../Icon';

interface IconProps {
  icon: string;
}

@Component
export class Icon extends VueComponent<IconProps> {
  @Prop()
  public icon: string;

  public render() {
    return <i class={['form-icon', 'icon', Icons[this.icon as any]]} />;
  }
}
