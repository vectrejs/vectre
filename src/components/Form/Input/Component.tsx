import { VNode, CreateElement } from 'vue';
import * as tsx from 'vue-tsx-support';
import { Sizes } from './Size';
import { Input } from './Input';
import { Icon } from './Icon';
import { IconContainer, IconSide } from './IconContainer';
import { Loading } from './Loading';

import { cachedAttrs, cachedListeners } from '../../../mixins/cache';

export interface InputEvents {
  onInput: (value: any) => void;
}

export const Component = tsx
  .componentFactoryOf<InputEvents>()
  .mixin(cachedListeners)
  .mixin(cachedAttrs)
  .create({
    name: 'FormInput',
    props: {
      value: [String, Number],
      error: Boolean,
      loading: Boolean,
      success: Boolean,
      icon: String,
      disabled: Boolean,
      iconSide: {
        type: String,
        validator: (side: string): boolean => Object.keys(IconSide).includes(side),
      },
      size: {
        type: String,
        validator: (size: string): boolean => Object.keys(Sizes).includes(size),
      },
    },
    inheritAttrs: false,

    methods: {
      onInput({ target: { value } }: { target: { value: string } }): void {
        this.$emit('input', value);
      },
    },

    render(h: CreateElement): VNode {
      const { icon, iconSide, loading, size, disabled } = this.$props;

      const input = (
        <Input
          size={size}
          value={this.value}
          error={this.error}
          success={this.success}
          {...{ attrs: { ...this.__attrs, disabled } }}
          {...{ on: { ...this.__listeners, input: this.onInput } }}
        />
      );

      if (icon || loading) {
        return (
          <IconContainer side={iconSide || 'right'}>
            {input}
            {loading && <Loading />}
            {!loading && <Icon icon={icon} />}
          </IconContainer>
        );
      }

      return input;
    },
  });
