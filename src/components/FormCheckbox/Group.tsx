import { FormCheckbox } from './Checkbox';
import { VNode, defineComponent, PropType } from 'vue';
import { FormCheckboxType } from './Type';
import { FormCheckboxSize } from './Size';

interface NormalizedOption {
  label: string;
  value: any;
}

const normalizeOptions = (options: { [label: string]: any } | string[]): NormalizedOption[] => {
  if (Array.isArray(options)) {
    return options.reduce((normal, value) => [...normal, { value, label: value }], [] as any[]);
  }

  const normalized = [];
  for (const label of Object.keys(options)) {
    normalized.push({ label, value: options[label] });
  }

  return normalized;
};

export const FormCheckboxGroup = /*#__PURE__*/ defineComponent({
  name: 'FormCheckboxGroup',
  model: {
    event: 'change',
  },
  props: {
    options: { type: [Array, Object] as PropType<Record<string, unknown> | unknown[]>, default: undefined },
    modelValue: { type: [Array, Object], default: (): any[] => [] },
    type: { type: String as () => FormCheckboxType, default: undefined },
    size: { type: String as () => FormCheckboxSize, default: undefined },
    inline: { type: Boolean },
    disabled: { type: Boolean },
    error: { type: Boolean },
  },
  emits: ['input', 'update:modelValue'],
  methods: {
    onChange(value: any): void {
      if (this.onInput) this.onInput(value);
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    },
  },
  render(): VNode {
    let group;

    if (this.options) {
      group = normalizeOptions(this.options).map(({ label, value }) => {
        return (
          <FormCheckbox
            value={value}
            label={label}
            inline={this.inline}
            type={this.type}
            size={this.size}
            disabled={this.disabled}
            error={this.error}
            onChange={this.onChange}
            modelValue={this.modelValue}
          />
        );
      });
    } else {
      group = ((this.$slots.default && this.$slots.default()) || [])
        .filter(({ type }) => {
          if (typeof type === 'object' && 'name' in type) {
            return type.name === 'FormCheckbox' || type.name === 'FormRadio';
          }
        })
        .map((option: VNode) => {
          option.props = {
            ...option.props,
            size: option.props.size !== undefined ? option.props.size : this.size,
            disabled: option.props.disabled !== undefined ? option.props.disabled : this.disabled,
            error: option.props.error !== undefined ? option.props.error : this.error,
            type: this.type || option.props.type,
            inline: this.inline || option.props.inline,
            modelValue: this.modelValue,
            onChange: this.onChange,
          };

          return option;
        });
    }

    return <div>{group}</div>;
  },
});
