import * as tsx from 'vue-tsx-support';
import { VNode, CreateElement } from 'vue';
import { cachedListeners } from '../../mixins/cache';
import { FormRadioSize, FormRadioSizes } from './Size';

export interface FormRadioEvents {
  onChange: (value: any) => void;
}

export const FormRadio = tsx
  .componentFactoryOf<FormRadioEvents>()
  .mixin(cachedListeners)
  .create({
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
      label: { type: String },
      name: { type: String },
      size: {
        type: String as () => FormRadioSize,
        validator: (size: FormRadioSize): boolean => Object.keys(FormRadioSizes).includes(size),
      },
      value: { type: undefined },
      model: { type: undefined },
    },
    computed: {
      _label(): string | VNode | any {
        return this.$slots.default || this.label || this._value;
      },
      _value(): any {
        return this.value || (this.$slots.default && this.$slots.default[0].text) || this.label;
      },
    },
    methods: {
      onChecked(): void {
        this.$emit('change', this._value);
      },
    },
    render(h: CreateElement): VNode {
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
            checked={this.checked || this.model === this._value}
            disabled={this.disabled}
            name={this.name}
            {...{ on: { ...this.__listeners, change: this.onChecked } }}
          />
          <i class="form-icon" /> {this._label}
        </label>
      );
    },
  });
