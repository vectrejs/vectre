import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { VNode } from 'vue';

interface IGroupProps {
  size?: 'lg' | 'sm';
  disabled?: boolean;
}

@Component
export class Group extends VueComponent<IGroupProps> {
  @Prop({
    type: String,
    validator: v => !v || ['lg', 'sm'].includes(v),
  })
  public size: 'lg' | 'sm';

  @Prop(Boolean)
  public disabled: boolean;

  @Prop(Boolean)
  public error: boolean;

  @Prop(Boolean)
  public success: boolean;

  public render() {
    if (this.size) {
      (this.$slots.default || []).map((v: VNode) => {
        // tslint:disable-next-line:max-line-length
        if (/^.*form-(label|input|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions!.tag!)) {
          (v.componentOptions!.propsData as { size: 'sm' | 'lg' }).size =
            (v.componentOptions!.propsData as { size: 'sm' | 'lg' }).size || this.size;
        }
      });
    }

    if (this.disabled) {
      (this.$slots.default || []).map((v: VNode) => {
        // tslint:disable-next-line:max-line-length
        if (/^.*form-(input|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions!.tag!)) {
          (v.componentOptions!.propsData as { disabled: boolean }).disabled =
            this.disabled || (v.componentOptions!.propsData as { disabled: boolean }).disabled;
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
