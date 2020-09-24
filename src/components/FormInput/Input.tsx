import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { FormInputSize, FormInputSizes } from './Size';

interface InputEvents {
  onInput: (event: any) => void;
}

export const Input = /*#__PURE__*/ tsx.componentFactoryOf<InputEvents>().create({
  name: 'Input',
  functional: true,
  props: {
    size: {
      type: String as () => FormInputSize,
      validator: (size: FormInputSize): boolean => Object.keys(FormInputSizes).includes(size),
    },
    error: { type: Boolean },
    success: { type: Boolean },
    value: { type: [String, Number] },
    disabled: { type: Boolean },
  },
  render(h: CreateElement, { props, data, listeners }): VNode {
    const cssClass = [
      'form-input',
      props.error ? 'is-error' : false,
      props.success ? 'is-success' : false,
      FormInputSizes[props.size],
    ];

    const onInput = (e: any): void => {
      const value = e.target.value;
      if (Array.isArray(listeners.input)) {
        return listeners.input.forEach((listener) => listener(value));
      }

      if (listeners.input) {
        listeners.input(value);
      }
    };

    return (
      <input
        class={cssClass}
        disabled={props.disabled}
        {...{
          ...data,
          domProps: { value: props.value },
          on: { ...listeners, input: onInput },
        }}
      />
    );
  },
});
