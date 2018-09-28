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

  public render() {
    if (this.size) {
      (this.$slots.default || []).map((v: VNode) => {
        // tslint:disable-next-line:max-line-length
        if (/^.*form-(label|input|select|checkbox|checkbox-group|radio|radio-group)$/.test(v.componentOptions!.tag!)) {
          (v.componentOptions!.propsData as { size: 'sm' | 'lg' }).size =
              (v.componentOptions!.propsData as { size: 'sm' | 'lg' }).size || this.size;
        }
        // switch (v.componentOptions!.tag) {
        //   case 'form-label':
        //   case 'form-input':
        //   case 'form-select':
        //   case 'form-checkbox':
        //   case 'form-checkbox-group':
        //   case 'form-radio':
        //   case 'form-radio':
        //     (v.componentOptions!.propsData as { size: 'sm' | 'lg' }).size =
        //       (v.componentOptions!.propsData as { size: 'sm' | 'lg' }).size || this.size;
        //     break;
        // }
      });
    }

    return (
      <div class="form-group">
        {this.$slots.default}
      </div>
    );
  }
}
