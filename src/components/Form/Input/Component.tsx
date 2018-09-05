import vue, { VNode } from 'vue';
import { Size } from '@components/Form/Input/Size';
import { Input } from './Input';
import { Icon } from './Icon';
import { IconContainer, IconSide } from './IconContainer';
import { Loading } from './Loading';

export const Component = vue.extend({
  props: {
    icon: {
      type: String,
    },
    iconSide: {
      type: String,
      validator: (side: string) => Object.keys(IconSide).includes(side),
    },
    loading: {
      type: Boolean,
    },
    size: {
      type: String,
      validator: (size: string) => Object.keys(Size).includes(size),
    },
    value: {
      type: String,
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
