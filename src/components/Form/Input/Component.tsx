import vue, { VNode } from 'vue';
import { Size } from './Size';
import { Input } from './Input';
import { Icon } from './Icon';
import { IconContainer, IconSide } from './IconContainer';
import { Loading } from './Loading';

export const Component = vue.extend({
  props: {
    value: String,
    error: Boolean,
    loading: Boolean,
    success: Boolean,
    icon: String,
    iconSide: {
      type: String,
      validator: (side: string) => Object.keys(IconSide).includes(side),
    },
    size: {
      type: String,
      validator: (size: string) => Object.keys(Size).includes(size),
    },
  },
  inheritAttrs: false,

  methods: {
    onInput({ target: { value } }: { target: { value: string } }) {
      this.$emit('input', value);
    },
  },

  render(): VNode {
    const { icon, iconSide, loading, size } = this.$props;

    const input = <Input
      size={size}
      attrs={this.$attrs}
      value={this.value}
      error={this.error}
      success={this.success}
      on={{ ...this.$listeners, ...{ input: this.onInput } }}
    />;

    if (icon || loading) {
      return (
        <IconContainer side={iconSide}>
          {input}
          {loading && <Loading />}
          {!loading && <Icon icon={icon} />}
        </IconContainer>
      );
    }

    return input;
  },
});
