import { Prop, Component } from 'vue-property-decorator';
import { VueComponent } from 'vue-tsx-helper';

interface IProps {
  label?: string | number;
  value?: any;
  model?: any;
}

@Component({
  model: {
    event: 'input',
    prop: 'model',
  },
})
export default class extends VueComponent<IProps> {
  @Prop([String, Number])
  public label: string | number;

  @Prop(Boolean)
  public checked: boolean;

  @Prop({ default: true })
  public value: any;

  @Prop(Boolean)
  public disabled: boolean;

  @Prop()
  protected model: any;

  public onChange({ target: { checked } }: any) {
    if (this.model === undefined || !Array.isArray(this.model)) {
      return this.$emit('input', checked ? this.value : undefined);
    }

    if (checked) {
      this.$emit('input', [...this.model, this.value]);
    } else {
      this.$emit('input', this.model.filter((option: any) => option !== this.value));
    }
  }

  public render() {
    return (
      <label class="form-checkbox">
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
