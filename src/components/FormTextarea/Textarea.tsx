import { defineComponent, PropType, VNode } from 'vue';

export interface FormTextareaEvents {
  onInput: (value: any) => void;
}

export const FormTextarea = /*#__PURE__*/ defineComponent({
  name: 'FormTextarea',
  props: {
    modelValue: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    onInput: { type: Function as PropType<(value: string) => void>, default: undefined },
  },
  emits: ['input', 'update:modelValue'],
  computed: {
    placeholder(): string | undefined {
      return (
        (this.$attrs.placeholder as string) || (this.$slots.default && (this.$slots.default()[0]?.children as string))
      );
    },
  },
  methods: {
    handleInput({ target: { value } }: any): void {
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    },
  },
  render(): VNode {
    return (
      <textarea
        class="form-input"
        placeholder={this.placeholder}
        value={this.modelValue}
        disabled={this.disabled}
        onInput={this.handleInput}
      />
    );
  },
});
