import { VNode, defineComponent } from 'vue';
// import { cachedListeners } from '../../mixins/cache';
import { FormRadioSize, FormRadioSizes } from './Size';

export const FormRadio = /*#__PURE__*/ defineComponent({
  name: 'FormRadio',
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    checked: { type: Boolean },
    disabled: { type: Boolean },
    error: { type: Boolean },
    inline: { type: Boolean },
    label: { type: String, default: undefined },
    name: { type: String, default: undefined },
    size: {
      type: String as () => FormRadioSize,
      validator: (size: FormRadioSize): boolean => Object.keys(FormRadioSizes).includes(size),
      default: undefined,
    },
    value: { type: undefined, default: undefined },
    modelValue: { type: undefined, default: undefined },
    onChange: { type: Function, default: undefined },
  },
  emits: ['change', 'update:modelValue'],
  computed: {
    _label(): string | VNode | any {
      return (this.$slots.default && this.$slots.default()[0].children) || this.label || this._value;
    },
    _value(): any {
      return this.value || (this.$slots.default && this.$slots.default()[0].children) || this.label;
    },
  },
  methods: {
    onChecked(): void {
      this.$emit('change', this._value);
      this.$emit('update:modelValue', this._value);
    },
  },
  render(): VNode {
    const cssClass = [
      'form-radio',
      this.inline ? 'form-inline' : false,
      this.error ? 'is-error' : false,
      FormRadioSizes[this.size],
    ];

    return (
      <label class={cssClass}>
        <input
          type="radio"
          checked={this.checked || this.modelValue === this._value}
          disabled={this.disabled}
          name={this.name}
          onChange={this.onChecked}
        />
        <i class="form-icon" /> {this._label}
      </label>
    );
  },
});
