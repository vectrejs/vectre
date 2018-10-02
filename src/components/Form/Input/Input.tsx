import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from 'vue-tsx-helper';
import { CreateElement } from 'vue';
import { Size } from './Size';
import { Sizes } from './Sizes';

type fn = (...args: any[]) => void;

interface InptProps {
  size: Sizes;
  attrs: { [name: string]: string };
  on: Record<string, fn | fn[]>;
  value: string;
}

@Component
export class Input extends VueComponent<InptProps> {
  @Prop({
    type: String,
  })
  public size: Sizes;

  @Prop()
  public attrs: { [name: string]: string };

  @Prop()
  public value: string;

  @Prop()
  public on: Record<string, fn | fn[]>;

  public render(h: CreateElement) {
    return (<input
      class={['form-input', Size[this.size]]}
      {...{
        domProps: { value: this.value },
        on: this.on,
        attrs: this.attrs,
      }} />);
  }
}
