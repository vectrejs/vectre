import { VNode, CreateElement, VNodeComponentOptions } from 'vue';
import { FormSelectOption, FormSelectOptionProps } from './Option';
import { FormSelectSize, FormSelectSizes } from './Size';
import * as tsx from 'vue-tsx-support';
import { cachedListeners, cachedAttrs } from '../../mixins/cache';

export interface InputEvent {
  target: {
    value: string;
    selectedOptions: HTMLCollectionOf<HTMLOptionElement>;
  };
}

export interface NormalizedOption {
  label: string;
  value: any;
}

export interface FormSelectEvents {
  onInput: (value: string | string[] | number | number[]) => void;
}

export const FormSelect = tsx
  .componentFactoryOf<FormSelectEvents>()
  .mixin(cachedListeners)
  .mixin(cachedAttrs)
  .create({
    name: 'FormSelect',
    props: {
      options: { type: [Object, Array] as (() => { [label: string]: string } | string[])[] },
      multiple: { type: Boolean },
      placeholder: { type: String },
      value: { type: [String, Number, Array as () => string[] | number[]], default: '' },
      size: { type: [String, Number] },
      scale: {
        type: String as () => FormSelectSize,
        validator: (size: FormSelectSize): boolean => Object.keys(FormSelectSizes).includes(size),
      },
      error: { type: Boolean },
      success: { type: Boolean },
      disabled: { type: Boolean },
    },
    mounted(): void {
      if (!this.options && !this.$slots.default) {
        throw new TypeError('Component could not be created without options');
      }
    },
    methods: {
      onInput({ target: { selectedOptions } }: InputEvent): void {
        if (this.multiple) {
          const selected = [...selectedOptions].map((option: HTMLOptionElement) => {
            return option.value || option.innerHTML;
          });
          this.$emit('input', selected);
        } else {
          this.$emit('input', selectedOptions[0].value);
        }
      },
      isSelected(
        label: string | number | undefined,
        value: string | number | undefined,
        current?: string | string[] | number | number[],
      ): boolean {
        current = current || this.value;

        if (current instanceof Array) {
          return current.some((v: string | string[] | number | number[]) => this.isSelected(label, value, v));
        }

        return (
          (label !== undefined && current.toString() === label.toString()) ||
          (value !== undefined && current.toString() === value.toString())
        );
      },

      normalizeOptions(options: { [label: string]: any } | string[]): NormalizedOption[] {
        if (Array.isArray(options)) {
          return options.reduce((normal, value) => [...normal, { value, label: value }], [] as any[]);
        }

        const normalized = [];
        for (const label of Object.keys(options)) {
          normalized.push({ label, value: options[label] });
        }

        return normalized;
      },
    },
    render(h: CreateElement): VNode {
      let options: VNode[] = [];

      if (this.options) {
        options = this.normalizeOptions(this.options).map(({ label, value }: NormalizedOption) => {
          return <FormSelectOption selected={this.isSelected(label, value)} label={label} value={value} />;
        });
      } else {
        options = (this.$slots.default || [])
          .filter(({ componentOptions }) => {
            return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-option');
          })
          .map((option: VNode) => {
            if (!option.componentOptions) {
              option.componentOptions = { children: [] as VNode[] } as VNodeComponentOptions;
            }
            if (!option.componentOptions.propsData) {
              option.componentOptions.propsData = {};
            }

            const props = option.componentOptions.propsData as FormSelectOptionProps;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const value = props.value || (option.componentOptions.children![0] || {}).text;

            props.selected = props.selected !== undefined ? props.selected : this.isSelected(props.label, value);

            return option;
          });
      }

      if (this.placeholder && !this.multiple) {
        options.unshift(
          <FormSelectOption value="" disabled selected>
            {this.placeholder}
          </FormSelectOption>,
        );
      }

      const cssClass = [
        'form-select',
        FormSelectSizes[this.scale],
        this.error ? 'is-error' : '',
        this.success ? 'is-success' : '',
      ];

      return (
        <select
          class={cssClass}
          multiple={this.multiple}
          disabled={this.disabled}
          size={Number(this.size)}
          {...{ attrs: { ...this.__attrs } }}
          {...{ on: { ...this.__listeners, input: this.onInput } }}
        >
          {options}
        </select>
      );
    },
  });
