import { defineComponent, PropType, VNode } from 'vue';
import { FormSelectOption } from './Option';
import { FormSelectSize, FormSelectSizes } from './Size';

export interface NormalizedOption {
  label: string;
  value: any;
}

export interface FormSelectEvents {
  onInput: (value: string | string[] | number | number[]) => void;
}

export const FormSelect = /*#__PURE__*/ defineComponent({
  name: 'FormSelect',
  props: {
    options: { type: [Object, Array] as PropType<string[] | Record<string, unknown>>, default: undefined },
    multiple: { type: Boolean },
    placeholder: { type: String, default: undefined },
    modelValue: { type: [String, Number, Array] as PropType<string | number | string[] | number[]>, default: '' },
    rows: { type: [String, Number], default: undefined },
    size: {
      type: String as PropType<FormSelectSize>,
      validator: (size: FormSelectSize): boolean => Object.keys(FormSelectSizes).includes(size),
      default: undefined,
    },
    error: { type: Boolean },
    success: { type: Boolean },
    disabled: { type: Boolean },
    onInput: { type: Function, default: undefined },
  },
  emits: ['input', 'update:modelValue'],
  mounted(): void {
    if (!this.options && !this.$slots.default) {
      throw new TypeError('Component could not be created without options');
    }
  },
  methods: {
    handleInput({ target }: Event): void {
      const selectedOptions = (target as HTMLSelectElement).selectedOptions;

      if (this.multiple) {
        const selected = [...selectedOptions].map((option: HTMLOptionElement) => {
          return option.value || option.innerHTML;
        });
        this.$emit('input', selected);
        this.$emit('update:modelValue', selected);
      } else {
        this.$emit('input', selectedOptions[0].value);
        this.$emit('update:modelValue', selectedOptions[0].value);
      }
    },
    isSelected(
      label: string | number | undefined,
      value: string | number | undefined,
      current?: string | string[] | number | number[],
    ): boolean {
      current = current || this.modelValue;

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
  render(): VNode {
    let options: VNode[] = [];

    if (this.options) {
      options = this.normalizeOptions(this.options).map(({ label, value }: NormalizedOption) => {
        return <FormSelectOption selected={this.isSelected(label, value)} label={label} value={value} />;
      });
    } else {
      options = (this.$slots.default() || [])
        .filter(({ type }) => {
          if (typeof type === 'object' && 'name' in type) {
            return type.name === 'FormSelectOption';
          }
        })
        .map((option: VNode) => {
          const value = option.props.value;

          option.props = {
            ...option.props,
            selected:
              option.props.selected !== undefined ? option.props.selected : this.isSelected(option.props.label, value),
          };

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
      FormSelectSizes[this.size],
      this.error ? 'is-error' : '',
      this.success ? 'is-success' : '',
    ];

    return (
      <select
        class={cssClass}
        multiple={this.multiple}
        disabled={this.disabled}
        size={Number(this.rows)}
        onInput={this.handleInput}
      >
        {options}
      </select>
    );
  },
});
