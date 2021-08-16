import { VNode, CreateElement } from 'vue';
import { FormInputSize, FormInputSizes } from './Size';
import { Input } from './Input';
import { Icon } from './Icon';
import { IconContainer, IconSide, IconSides } from './IconContainer';
import { Loading } from './Loading';

export interface FormInputEvents {
  onInput: (value: any) => void;
}

export const FormInput = /*#__PURE__*/ tsx.componentFactoryOf<FormInputEvents>().create({
  name: 'FormInput',
  props: {
    value: [String, Number],
    disabled: Boolean,
    error: Boolean,
    loading: Boolean,
    success: Boolean,
    icon: String,
    iconSide: {
      type: String as () => IconSide,
      validator: (side: IconSide): boolean => Object.keys(IconSides).includes(side),
    },
    size: {
      type: String as () => FormInputSize,
      validator: (size: FormInputSize): boolean => Object.keys(FormInputSizes).includes(size),
    },
  },
  render(h: CreateElement): VNode {
    const input = (
      <Input
        size={this.size}
        value={this.value}
        error={this.error}
        success={this.success}
        disabled={this.disabled}
        {...{
          ...this.$attrs,
          on: this.$listeners,
        }}
      />
    );

    if (this.icon || this.loading) {
      return (
        <IconContainer side={this.iconSide || 'right'}>
          {input}
          {this.loading && <Loading />}
          {!this.loading && <Icon icon={this.icon} />}
        </IconContainer>
      );
    }

    return input;
  },
});
