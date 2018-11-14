import vue, { VNode, CreateElement } from 'vue';
import { Sizes } from './Size';
import { Input } from './Input';
import { Icon } from './Icon';
import { IconContainer, IconSide } from './IconContainer';
import { Loading } from './Loading';

export const Component = vue.extend({
  props: {
    value: [String, Number],
    error: Boolean,
    loading: Boolean,
    success: Boolean,
    icon: String,
    disabled: Boolean,
    iconSide: {
      type: String,
      validator: (side: string) => Object.keys(IconSide).includes(side),
    },
    size: {
      type: String,
      validator: (size: string) => Object.keys(Sizes).includes(size),
    },
  },
  inheritAttrs: false,

  methods: {
    onInput({ target: { value } }: { target: { value: string } }) {
      this.$emit('input', value);
    },
  },

  render(): VNode {
    const { icon, iconSide, loading, size, disabled } = this.$props;

    const input = <Input
      size={size}
      attrs={{ ...this.$attrs, disabled }}
      value={this.value}
      error={this.error}
      success={this.success}
      on={{ ...this.$listeners, ...{ input: this.onInput } }}
    />;

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
