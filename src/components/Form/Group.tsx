import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { VNode } from 'vue';
import { LabelSizes, LabelSize } from '@components/Form/Label';
import { InputSize, InputSizes } from '@components/Form/Input';
import { SelectSizes, SelectSize } from '@components/Form/Select';

interface IGroupProps {
  size?: 'lg' | 'sm';
}

@Component
export class Group extends VueComponent<IGroupProps> {
  @Prop({
    type: String,
    validator: v => !v || ['lg', 'sm'].includes(v),
  })
  public size: 'lg' | 'sm';

  @Prop(Boolean)
  public error: boolean;

  @Prop(Boolean)
  public success: boolean;

  public render() {
    if (this.size) {
      (this.$slots.default || []).map((v: VNode) => {
        // tslint:disable-next-line:max-line-length
        if (/^.*form-(label|input|select|checkbox|checkbox-group|radio|radio-group)$/.test(v.componentOptions!.tag!)) {
          (v.componentOptions!.propsData as { size: 'sm' | 'lg' }).size =
              (v.componentOptions!.propsData as { size: 'sm' | 'lg' }).size || this.size;
        }
      });
    }

    const cssClass = [
      'form-group',
      this.error ? 'has-error' : '',
      this.success ? 'has-success' : '',
    ];

    return (
      <div class={cssClass}>
        {this.$slots.default}
      </div>
    );
  }
}
