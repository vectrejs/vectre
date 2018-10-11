import { Prop, Component } from 'vue-property-decorator';
import { VueComponent } from 'vue-tsx-helper';
import { Type } from './Type';
import { Types } from './Types';
import { Size } from './Size';
import { Sizes } from './Sizes';

export interface ICheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  inline?: boolean;
  label?: string | number;
  model?: any;
  type?: Types;
  value?: any;
  size?: Sizes;
  error?: boolean;
}

@Component({
  model: {
    event: 'input',
    prop: 'model',
  },
})
export default class extends VueComponent<ICheckboxProps> {
  @Prop([String, Number])
  public label: string | number;

  @Prop(Boolean)
  public checked: boolean;

  @Prop({ default: true })
  public value: any;

  @Prop(Boolean)
  public disabled: boolean;

  @Prop({
    type: String,
    validator: v => Object.keys(Type).includes(v),
  })
  public type: Types;

  @Prop(Boolean)
  public inline: boolean;

  @Prop(String)
  public size: Sizes;

  @Prop(Boolean)
  public error: boolean;

  @Prop()
  protected model: any;

  public onChange({ target: { checked } }: any) {
    if (this.model === undefined || !Array.isArray(this.model)) {
      return this.$emit('input', checked ? this.value : false);
    }

    if (checked) {
      this.$emit('input', [...this.model, this.value]);
    } else {
      this.$emit('input', this.model.filter((option: any) => option !== this.value));
    }
  }

  public render() {
    const cssClass = [
      Type[this.type] || 'form-checkbox',
      this.inline ? 'form-inline' : '',
      this.error ? 'is-error' : false,
      Size[this.size],
    ];

    return (
      <label class={cssClass}>
        <input
          type="checkbox"
          onChange={this.update}
          checked={this._checked}
          disabled={this.disabled}
          {...{ on: { ...this.$listeners, change: this.onChange } }}
        />
        <i class="form-icon"></i>
        {this.$slots.default || this.label || this.value}
      </label>
    );
  }

  private get _checked(): boolean {
    if (!Array.isArray(this.model)) {
      return this.checked || (this.model && this.model === this.value);
    }

    return this.model.includes(this.value);
  }
}
