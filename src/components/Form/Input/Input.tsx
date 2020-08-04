import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { Size, Sizes } from './Size';

import { cachedAttrs, cachedListeners } from '../../../mixins/cache';

export const Input = tsx
  .componentFactoryOf()
  .mixin(cachedListeners)
  .mixin(cachedAttrs)
  .create({
    name: 'Input',
    props: {
      size: { type: String as () => Size, validator: (size: Size): boolean => Object.keys(Sizes).includes(size) },
      error: { type: Boolean },
      success: { type: Boolean },
      value: { type: [String, Number] },
    },
    render(h: CreateElement): VNode {
      const cssClass = [
        'form-input',
        this.error ? 'is-error' : false,
        this.success ? 'is-success' : false,
        Sizes[this.size],
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
