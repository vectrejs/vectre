import { VNode, CreateElement, VNodeComponentOptions } from 'vue';
import * as tsx from 'vue-tsx-support';
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

export const FormRadioGroup = /*#__PURE__*/ tsx.componentFactoryOf().create({
  name: 'FormRadioGroup',
  props: {
    name: { type: String },
    options: { type: undefined },
    value: { type: undefined },
    size: { type: String as () => FormRadioSize, default: undefined },
    inline: { type: Boolean },
    disabled: { type: Boolean },
    error: { type: Boolean },
  },
  methods: {
    update(value: any): void {
      this.$emit('input', value);
    },
  },
  render(h: CreateElement): VNode {
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
            {...{ props: { model: this.value } }}
          />
        );
      });
    } else {
      group = (this.$slots.default || [])
        .filter(({ componentOptions }) => {
          return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-radio');
        })
        .map((option: VNode) => {
          if (!option.componentOptions) {
            option.componentOptions = {} as VNodeComponentOptions;
          }

          const props = (option.componentOptions.propsData || {}) as InstanceType<typeof FormRadio>;
          props.name = name;
          props.size = props.size !== undefined ? props.size : this.size;
          props.disabled = props.disabled !== undefined ? props.disabled : this.disabled;
          props.error = props.error !== undefined ? props.error : this.error;
          props.inline = this.inline || props.inline;
          props.model = this.value;

          option.componentOptions.listeners = {
            ...option.componentOptions.listeners,
            change: this.update,
          };

          return option;
        });
    }

    return <div>{group}</div>;
  },
});
