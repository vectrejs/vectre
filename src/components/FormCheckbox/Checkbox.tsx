import { FormCheckboxType, FormCheckboxTypes } from './Type';
import { FormCheckboxSize, FormCheckboxSizes } from './Size';
import { defineComponent, PropType, VNode } from 'vue';

export const FormCheckbox = /*#__PURE__*/ defineComponent({
  name: 'FormCheckbox',
  props: {
    checked: { type: Boolean },
    disabled: { type: Boolean },
    inline: { type: Boolean },
    label: { type: [String, Number], default: undefined },
    modelValue: { type: undefined, default: undefined },
    value: { type: undefined, default: undefined },
    size: {
      type: String as PropType<FormCheckboxSize>,
      validator: (v: FormCheckboxSize): boolean => Object.keys(FormCheckboxSizes).includes(v),
      default: undefined,
    },
    type: {
      type: String as PropType<FormCheckboxType>,
      validator: (v: FormCheckboxType): boolean => Object.keys(FormCheckboxTypes).includes(v),
      default: undefined,
    },
    error: { type: Boolean },
    onChange: { type: Function, default: undefined },
  },
  emits: ['change', 'update:modelValue'],
  computed: {
    _checked(): boolean {
      if (!Array.isArray(this.modelValue)) {
        return this.checked || (this.modelValue && this.modelValue === this.value);
      }

      return this.modelValue.includes(this.value);
    },
  },
  methods: {
    handleChange({ target: { checked } }: any): void {
      let value;

      if (this.modelValue === undefined || !Array.isArray(this.modelValue)) {
        value = checked ? this.value || checked : false;
      } else if (checked) {
        value = [...this.modelValue, this.value];
      } else {
        value = this.modelValue.filter((option: any) => option !== this.value);
      }

      this.onChange && this.onChange(value);
      this.$emit('change', value);
      this.$emit('update:modelValue', value);
    },
  },
  render(): VNode {
    const cssClass = [
      FormCheckboxTypes[this.type as FormCheckboxType] || 'form-checkbox',
      this.inline ? 'form-inline' : '',
      this.error ? 'is-error' : false,
      FormCheckboxSizes[this.size as FormCheckboxSize],
    ];

    return (
      <label class={cssClass}>
        <input type="checkbox" checked={this._checked} disabled={this.disabled} onChange={this.handleChange} />
        <i class="form-icon" />
        {(this.$slots.default && this.$slots.default()) || this.label || this.value}
      </label>
    );
  },
});
