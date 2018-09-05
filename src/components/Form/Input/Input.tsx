import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from 'vue-tsx-helper';
import { CreateElement } from 'vue';
import { Size } from '@components/Form/Input/Size';

type fn = (...args: any[]) => void;

interface InptProps {
  size: Size;
  attrs: { [name: string]: string };
  on: Record<string, fn | fn[]>;
  value: string;
}

@Component
export class Input extends VueComponent<InptProps> {
  @Prop()
  public size: Size;

  @Prop()
  public attrs: { [name: string]: string };

  @Prop()
  public value: string;

  @Prop()
  public on: Record<string, fn | fn[]>;

  public render(h: CreateElement) {
    return (<input
      class={['form-input', Size[this.size as any]]}
      {...{
        domProps: { value: this.value },
        on: this.on,
        attrs: this.attrs,
      }} />);
  }
}
