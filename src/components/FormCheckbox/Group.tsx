import * as tsx from 'vue-tsx-support';
import { FormCheckbox } from './Checkbox';
import { VNode, CreateElement, VNodeComponentOptions } from 'vue';
import { FormCheckboxType } from './Type';
import { FormCheckboxSize } from './Size';
import { FormCheckboxEvents } from './Event';
import { cachedListeners } from '../../mixins/cache';

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

const isCheckboxTag = (tag = ''): boolean => /^.*form-?(checkbox|switch)$/i.test(tag);

export const FormCheckboxGroup = /*#__PURE__*/ tsx
  .componentFactoryOf<FormCheckboxEvents>()
  .mixin(cachedListeners)
  .create({
    name: 'FormCheckboxGroup',
    model: {
      event: 'change',
    },
    props: {
      options: { type: [Array, Object] as (() => { [label: string]: string } | string[])[] },
      value: { type: [Array, Object], default: (): any[] => [] },
      type: { type: String as () => FormCheckboxType, default: undefined },
      size: { type: String as () => FormCheckboxSize, default: undefined },
      inline: { type: Boolean },
      disabled: { type: Boolean },
      error: { type: Boolean },
    },
    methods: {
      onChange(value: any): void {
        this.$emit('change', value);
      },
    },
    render(h: CreateElement): VNode {
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
              {...{ props: { model: this.value }, on: { ...this.$listeners, change: this.onChange } }}
            />
          );
        });
      } else {
        group = (this.$slots.default || [])
          .filter(
            ({ tag = '', componentOptions: { tag: componentTag = '' } }) =>
              isCheckboxTag(tag) || isCheckboxTag(componentTag),
          )
          .map((option: VNode) => {
            if (!option.componentOptions) {
              option.componentOptions = {} as VNodeComponentOptions;
            }
            if (!option.componentOptions.propsData) {
              option.componentOptions.propsData = {};
            }
            const props = option.componentOptions.propsData as InstanceType<typeof FormCheckbox>;
            props.model = this.value;
            props.inline = this.inline || this.inline;
            props.type = this.type || this.type;
            props.size = this.size !== undefined ? this.size : this.size;
            props.disabled = this.disabled !== undefined ? this.disabled : this.disabled;
            props.error = this.error !== undefined ? this.error : this.error;

            const listeners = option.componentOptions.listeners as any;
            const change = [this.onChange];
            if (listeners && listeners.change) {
              change.push(listeners.change);
            }

            option.componentOptions.listeners = {
              ...listeners,
              change,
            };

            return option;
          });
      }

      return <div>{group}</div>;
    },
  });
