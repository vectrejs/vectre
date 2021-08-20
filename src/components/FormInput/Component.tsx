import { defineComponent, PropType, VNode } from 'vue';
import { FormInputSize, FormInputSizes } from './Size';
import { Input } from './Input';
import { Icon } from './Icon';
import { IconContainer, IconSide, IconSides } from './IconContainer';
import { Loading } from './Loading';
import { IconType } from '@components/Icon';

export interface FormInputEvents {
  onInput: (value: any) => void;
}

export const FormInput = /*#__PURE__*/ defineComponent({
  name: 'FormInput',
  props: {
    modelValue: { type: [String, Number], default: undefined },
    disabled: Boolean,
    error: Boolean,
    loading: Boolean,
    success: Boolean,
    icon: { type: String as PropType<IconType>, default: undefined },
    iconSide: {
      type: String as PropType<IconSide>,
      validator: (side: IconSide): boolean => !side || Object.keys(IconSides).includes(side),
      default: 'right',
    },
    size: {
      type: String as PropType<FormInputSize>,
      validator: (size: FormInputSize): boolean => Object.keys(FormInputSizes).includes(size),
      default: undefined,
    },
  },
  emits: ['input', 'update:modelValue'],
  render(): VNode {
    const input = (
      <Input
        size={this.size}
        value={this.modelValue}
        error={this.error}
        success={this.success}
        disabled={this.disabled}
        onInput={(v): void => (this.$emit('input', v), this.$emit('update:modelValue', v))}
      />
    );

    if (this.icon || this.loading) {
      return (
        <IconContainer side={this.iconSide}>
          {input}
          {this.loading && <Loading />}
          {!this.loading && <Icon icon={this.icon} />}
        </IconContainer>
      );
    }

    return input;
  },
});
