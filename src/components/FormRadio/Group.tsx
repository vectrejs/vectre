import { VNode, defineComponent, PropType } from 'vue';
import { uid } from '../../utils/uid';
import { FormRadio } from './Radio';
import { FormRadioSize } from './Size';

interface NormalizedOption {
  value: any;
  label: string;
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

export const FormRadioGroup = /*#__PURE__*/ defineComponent({
  name: 'FormRadioGroup',
  props: {
    name: { type: String, default: undefined },
    options: { type: undefined, default: undefined },
    modelValue: { type: undefined, default: undefined },
    size: { type: String as PropType<FormRadioSize>, default: undefined },
    inline: { type: Boolean },
    disabled: { type: Boolean },
    error: { type: Boolean },
  },
  emits: ['input', 'update:modelValue'],
  methods: {
    update(value: any): void {
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    },
  },
  render(): VNode {
    const name = this.name || uid(this);
    let group: VNode[];

    if (this.options) {
      group = normalizeOptions(this.options).map(({ label, value }) => {
        return (
          <FormRadio
            name={name}
            label={label}
            value={value}
            error={this.error}
            onChange={this.update}
            inline={this.inline}
            size={this.size}
            disabled={this.disabled}
          />
        );
      });
    } else {
      group = ((this.$slots.default && this.$slots.default()) || [])
        .filter(({ type }) => {
          if (typeof type === 'object' && 'name' in type) {
            return type.name === 'FormRadio';
          }
        })
        .map((radio: VNode) => {
          // const dynamicProps = (radio as any).dynamicProps || [];
          // (radio as any).dynamicProps = [...new Set([...dynamicProps, 'active'])];

          // debugger;

          radio.props = {
            ...radio.props,
            name: name,
            size: radio.props.size !== undefined ? radio.props.size : this.size,
            disabled: radio.props.disabled !== undefined ? radio.props.disabled : this.disabled,
            error: radio.props.error !== undefined ? radio.props.error : this.error,
            inline: this.inline || radio.props.inline,
            modelValue: this.modelValue,
            onChange: this.update,
          };

          return radio;
        });
    }

    return <div>{group}</div>;
  },
});
