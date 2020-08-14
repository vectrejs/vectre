import * as tsx from 'vue-tsx-support';
import { VNode, CreateElement } from 'vue';

export const FormGroup = tsx.createComponent({
  name: 'FormGroup',
  functional: true,
  props: {
    size: { type: String as () => 'lg' | 'sm', validator: (v: string): boolean => !v || ['lg', 'sm'].includes(v) },
    disabled: { type: Boolean },
    error: { type: Boolean },
    success: { type: Boolean },
  },
  render(h: CreateElement, { props, slots, data }): VNode {
    if (props.size) {
      (slots().default || []).map((v: VNode) => {
        if (
          v.componentOptions &&
          /^.*form-(label|input|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions.tag || '')
        ) {
          if (!v.componentOptions.propsData) {
            v.componentOptions.propsData = {};
          }

          (v.componentOptions.propsData as { size: 'sm' | 'lg' }).size =
            (v.componentOptions.propsData as { size: 'sm' | 'lg' }).size || props.size;
        }
      });
    }

    if (props.disabled !== undefined) {
      (slots().default || []).map((v: VNode) => {
        if (
          v.componentOptions &&
          /^.*form-(input|textarea|select|checkbox-group|checkbox|radio-group|radio)$/.test(
            v.componentOptions.tag || '',
          )
        ) {
          if (!v.componentOptions.propsData) {
            v.componentOptions.propsData = {};
          }

          (v.componentOptions.propsData as { disabled: boolean }).disabled = props.disabled;
        }
      });
    }

    const cssClass = [
      'form-group',
      props.error && 'has-error',
      props.success && 'has-success',
      data.class,
      data.staticClass,
    ];

    return (
      <div class={cssClass} {...data}>
        {slots().default}
      </div>
    );
  },
});
