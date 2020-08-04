import * as tsx from 'vue-tsx-support';
import { Type, Types } from './Type';
import { Size, Sizes } from './Size';
import { CreateElement, VNode } from 'vue';
import { cachedListeners } from '../../../mixins/cache';

export interface CheckboxEvents {
  onChange: (value: any) => void;
}

export const Checkbox = tsx
  .componentFactoryOf<CheckboxEvents>()
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
      size: { type: String as () => Size, validator: (v: string): boolean => Object.keys(Sizes).includes(v) },
      type: { type: String as () => Type, validator: (v: string): boolean => Object.keys(Types).includes(v) },
      error: { type: Boolean },
    },
    model: {
      event: 'change',
      prop: 'model',
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
          this.$emit('change', this.model.filter((option: any) => option !== this.value));
        }
      },
    },
    render(h: CreateElement): VNode {
      const cssClass = [
        Types[this.type as Type] || 'form-checkbox',
        this.inline ? 'form-inline' : '',
        this.error ? 'is-error' : false,
        Sizes[this.size as Size],
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
