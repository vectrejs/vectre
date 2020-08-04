import * as tsx from 'vue-tsx-support';
import { cachedListeners, cachedAttrs } from 'src/mixins/cache';
import { CreateElement, VNode } from 'vue';

export interface TextareaEvents {
  onInput: (value: any) => void;
}

export const Textarea = tsx
  .componentFactoryOf<TextareaEvents>()
  .mixin(cachedListeners)
  .mixin(cachedAttrs)
  .create({
    name: 'FormTextarea',
    props: {
      value: { type: String, default: undefined },
      disabled: { type: Boolean, default: false },
    },
    data: () => ({
      listeners: {},
    }),
    computed: {
      placeholder(): string | undefined {
        return this.$attrs.placeholder || (this.$slots.default && this.$slots.default[0].text);
      },
    },
    methods: {
      onInput({ target: { value } }: any): void {
        this.$emit('input', value);
      },
    },
    render(h: CreateElement): VNode {
      return (
        <textarea
          placeholder={this.placeholder}
          value={this.value}
          disabled={this.disabled}
          class="form-input"
          {...{ attrs: { ...this.__attrs } }}
          {...{ on: { ...this.__listeners, input: this.onInput } }}
        />
      );
    },
  });
