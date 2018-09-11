import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';

export interface IRadioProps {
  value?: string;
  label?: string;
  name?: string;
  checked?: boolean;
}

@Component
export class Radio extends VueComponent<IRadioProps> {
  @Prop([String, Number])
  public value: string | number;

  @Prop(String)
  public label: string;

  @Prop(String)
  public name: string;

  @Prop(Boolean)
  public checked?: boolean;

  public render() {
    return (
      <label class="form-radio">
        <input type="radio" name={this.name} />
        <i class="form-icon"></i> {this.$slots.default || this.label}
      </label>
    );
  }
}
