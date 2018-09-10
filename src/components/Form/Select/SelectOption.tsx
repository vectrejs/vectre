import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { VueComponent } from 'vue-tsx-helper';

interface IProps {
  value?: string;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}

@Component
export default class extends VueComponent<IProps> {
  @Prop(Boolean)
  public disabled: boolean;

  @Prop()
  public value: string | number;

  @Prop()
  public label: string | number;

  @Prop()
  public selected: boolean;

  public render() {
    const { selected, disabled, value, label } = this.$props;

    return (
      <option selected={selected} disabled={disabled} value={value}>
        {this.$slots.default || label}
      </option>
    );
  }
}
