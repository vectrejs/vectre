import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from 'vue-tsx-helper';
import { CreateElement } from 'vue';
import { Size, Sizes } from './Size';

type fn = (...args: any[]) => void;

interface IInptProps {
  value?: string | number;
  attrs: { [name: string]: string };
  on: Record<string, fn | fn[]>;
  error?: boolean;
  size?: Sizes;
  success?: boolean;
}

@Component
export class Input extends VueComponent<IInptProps> {
  @Prop({
    type: String,
    validator: size => Object.keys(Sizes).includes(size),
  })
  public size: Size;

  @Prop()
  public attrs: { [name: string]: string };

  @Prop([String, Number])
  public value: string | number;

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
      Sizes[this.size],
    ];

    return (
      <input
        class={cssClass}
        {...{
          domProps: { value: this.value },
          on: this.on,
          attrs: this.attrs,
        }}
      />
    );
  }
}
