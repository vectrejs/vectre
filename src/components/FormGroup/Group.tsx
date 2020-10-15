import * as tsx from 'vue-tsx-support';
import { VNode, CreateElement } from 'vue';
import { CommonOptions } from './Options';

const isFormTag = (tag = ''): boolean =>
  /^.*form-?(label|input|select|switch|switch-?group|checkbox-?group|checkbox|radio-?group|radio)$/i.test(tag);

export const FormGroup = /*#__PURE__*/ tsx.createComponent({
  name: 'FormGroup',
  functional: true,
  props: {
    size: { type: String as () => 'lg' | 'sm', validator: (v: string): boolean => !v || ['lg', 'sm'].includes(v) },
    disabled: { type: Boolean },
    error: { type: Boolean },
    success: { type: Boolean },
  },
  render(h: CreateElement, { props, slots, data, children }): VNode {
    if (props.size) {
      children.map((v: VNode & CommonOptions) => {
        if (v.componentOptions && isFormTag(v.componentOptions.tag)) {
          if (!v.componentOptions.propsData) {
            v.componentOptions.propsData = {};
          }

          v.componentOptions.propsData.size = v.componentOptions.propsData.size || props.size;
        }
      });
    }

    if (props.disabled !== undefined) {
      children.map((v: VNode & CommonOptions) => {
        if (v.componentOptions && isFormTag(v.componentOptions.tag)) {
          if (!v.componentOptions.propsData) {
            v.componentOptions.propsData = {};
          }

          v.componentOptions.propsData.disabled = props.disabled;
        }
      });
    }

    const cssClass = ['form-group', props.error && 'has-error', props.success && 'has-success'];

    return (
      <div class={cssClass} {...data}>
        {slots().default}
      </div>
    );
  },
});
