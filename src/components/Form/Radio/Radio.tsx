import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';

export interface IRadioProps {
  value?: string;
  label?: string;
  name?: string;
  checked?: boolean;
}

@Component({
  model: {
    prop: 'model',
    event: 'update',
  },
})
export class Radio extends VueComponent<IRadioProps> {
  @Prop([String, Number])
  public value: string | number;

  @Prop(String)
  public label: string;

  @Prop(String)
  public name: string;

  @Prop(Boolean)
  public checked?: boolean;

  @Prop([String, Boolean, Object, Number, Array])
  protected model: any;

  public onChecked(e: any): void {
    this.$emit('update', this.value || e.target);
  }

  public render() {
    return (
      <label class="form-radio">
        <input type="radio" name={this.name} onChange={this.onChecked} />
        <i class="form-icon"></i> {this.$slots.default || this.label}
      </label>
    );
  }
}
