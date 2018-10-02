import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from 'vue-tsx-helper';
import { CreateElement } from 'vue';
import { Size } from './Size';
import { Sizes } from './Sizes';

type fn = (...args: any[]) => void;

interface InptProps {
  value?: string;
  attrs: { [name: string]: string };
  on: Record<string, fn | fn[]>;
  error?: boolean;
  size?: Sizes;
  success?: boolean;
}

@Component
export class Input extends VueComponent<InptProps> {
  @Prop({
    type: String,
    validator: size => Object.keys(Size).includes(size),
  })
  public size: Sizes;

  @Prop()
  public attrs: { [name: string]: string };

  @Prop(String)
  public value: string;

  @Prop()
  public on: Record<string, fn | fn[]>;

  @Prop(Boolean)
  public error: boolean;

  @Prop(Boolean)
  public success: boolean;

  public render(h: CreateElement) {
    const cssClass = [
      'form-input',
      this.error ? 'is-error' : false,
      this.success ? 'is-success' : false,
      Size[this.size],
    ];

    return (<input
      class={cssClass}
      {...{
        domProps: { value: this.value },
        on: this.on,
        attrs: this.attrs,
      }} />);
  }
}
