import { defineComponent, PropType, VNode } from 'vue';
import { FormInputSize, FormInputSizes } from './Size';

export const Input = /*#__PURE__*/ defineComponent({
  name: 'Input',
  props: {
    size: {
      type: String as PropType<FormInputSize>,
      validator: (size: FormInputSize): boolean => Object.keys(FormInputSizes).includes(size),
      default: undefined,
    },
    error: { type: Boolean },
    success: { type: Boolean },
    value: { type: [String, Number], default: undefined },
    disabled: { type: Boolean },
    onInput: { type: Function as PropType<(v: string) => void>, default: undefined },
  },
  emits: ['input'],
  render(): VNode {
    const cssClass = [
      'form-input',
      this.error ? 'is-error' : false,
      this.success ? 'is-success' : false,
      FormInputSizes[this.size],
    ];

    const onInput = ({ target: { value } }: any): void => {
      this.$emit('input', value);
    };

    return <input class={cssClass} disabled={this.disabled} onInput={onInput} value={this.value} />;
  },
});
