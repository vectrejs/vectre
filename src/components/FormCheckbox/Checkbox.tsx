import { FormCheckboxType, FormCheckboxTypes } from './Type';
import { FormCheckboxSize, FormCheckboxSizes } from './Size';
import { CreateElement, VNode } from 'vue';
import { cachedListeners } from '../../mixins/cache';
import { FormCheckboxEvents } from './Event';

export const FormCheckbox = /*#__PURE__*/ tsx
  .componentFactoryOf<FormCheckboxEvents>()
  .mixin(cachedListeners)
  .create({
    name: 'FormCheckbox',
    props: {
      checked: { type: Boolean },
      disabled: { type: Boolean },
      inline: { type: Boolean },
      label: { type: [String, Number] },
      model: { type: undefined as any },
      value: { type: undefined as any },
      size: {
        type: String as () => FormCheckboxSize,
        validator: (v: FormCheckboxSize): boolean => Object.keys(FormCheckboxSizes).includes(v),
      },
      type: {
        type: String as () => FormCheckboxType,
        validator: (v: FormCheckboxType): boolean => Object.keys(FormCheckboxTypes).includes(v),
      },
      error: { type: Boolean },
    },
    model: {
      prop: 'model',
      event: 'change',
    },
    computed: {
      _checked(): boolean {
        if (!Array.isArray(this.model)) {
          return this.checked || (this.model && this.model === this.value);
        }

        return this.model.includes(this.value);
      },
    },
    methods: {
      onChange({ target: { checked } }: any): void {
        if (this.model === undefined || !Array.isArray(this.model)) {
          this.$emit('change', checked ? this.value || checked : false);
          return;
        }

        if (checked) {
          this.$emit('change', [...this.model, this.value]);
        } else {
          this.$emit(
            'change',
            this.model.filter((option: any) => option !== this.value),
          );
        }
      },
    },
    render(h: CreateElement): VNode {
      const cssClass = [
        FormCheckboxTypes[this.type as FormCheckboxType] || 'form-checkbox',
        this.inline ? 'form-inline' : '',
        this.error ? 'is-error' : false,
        FormCheckboxSizes[this.size as FormCheckboxSize],
      ];

      return (
        <label class={cssClass}>
          <input
            type="checkbox"
            checked={this._checked}
            disabled={this.disabled}
            {...{ on: { ...this.__listeners, change: this.onChange } }}
          />
          <i class="form-icon" />
          {this.$slots.default || this.label || this.value}
        </label>
      );
    },
  });
