import { Component as TsxComponent } from 'vue-tsx-support';
import { Prop, Component } from 'vue-property-decorator';
import { Icons, IconType } from '../../Icon';
import { VNode, CreateElement } from 'vue';

interface IconProps {
  icon: string;
}

@Component
export class Icon extends TsxComponent<IconProps> {
  @Prop()
  public icon: string;

  public render(h: CreateElement): VNode {
    return <i class={['form-icon', 'icon', Icons[this.icon as IconType]]} />;
  }
}
