import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { Size, Sizes } from './Size';
import { VNode, CreateElement } from 'vue';

export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  inline?: boolean;
  label?: string;
  name?: string;
  size?: Size;
  value?: any;
  model?: any;
}

@Component({
  model: {
    prop: 'model',
    event: 'change',
  },
})
export class Radio extends VueComponent<RadioProps> {
  @Prop()
  public value: any;

  @Prop(String)
  public label: string;

  @Prop(String)
  public name: string;

  @Prop(Boolean)
  public checked?: boolean;

  @Prop(Boolean)
  public inline: boolean;

  @Prop(Boolean)
  public error: boolean;

  @Prop({
    type: String,
    validator: size => Object.keys(Sizes).includes(size),
  })
  public size: Size;

  @Prop(Boolean)
  public disabled: boolean;

  @Prop([String, Boolean, Object, Number, Array])
  protected model: any;

  public onChecked(): void {
    this.$emit('change', this._value);
  }

  public render(h: CreateElement): VNode {
    const cssClass = [
      'form-radio',
      this.inline ? 'form-inline' : false,
      this.error ? 'is-error' : false,
      Sizes[this.size],
    ];

    return (
      <label class={cssClass}>
        <input
          type="radio"
          checked={this.checked || this.model === this._value}
          disabled={this.disabled}
          name={this.name}
          onChange={this.onChecked}
        />
        <i class="form-icon" /> {this._label}
      </label>
    );
  }

  private get _label(): string | VNode | any {
    return this.$slots.default || this.label || this._value;
  }

  private get _value(): any {
    return this.value || (this.$slots.default && this.$slots.default[0].text) || this.label;
  }
}
