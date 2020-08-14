import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { FormInputSize, FormInputSizes } from './Size';

import { cachedAttrs, cachedListeners } from '../../mixins/cache';

export const Input = tsx
  .componentFactoryOf()
  .mixin(cachedListeners)
  .mixin(cachedAttrs)
  .create({
    name: 'Input',
    props: {
      size: {
        type: String as () => FormInputSize,
        validator: (size: FormInputSize): boolean => Object.keys(FormInputSizes).includes(size),
      },
      error: { type: Boolean },
      success: { type: Boolean },
      value: { type: [String, Number] },
    },
    render(h: CreateElement): VNode {
      const cssClass = [
        'form-input',
        this.error ? 'is-error' : false,
        this.success ? 'is-success' : false,
        FormInputSizes[this.size],
      ];

      return (
        <input
          class={cssClass}
          {...{
            domProps: { value: this.value },
            on: this.__listeners,
            attrs: this.__attrs,
          }}
        />
      );
    },
  });
