<template>
  <textarea
    :placeholder="placeholder"
    :value="value"
    :disabled="disabled"
    class="form-input"
    v-on="listeners"
    @input="onInput"
  ></textarea>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Textarea',
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
  created() {
    this.listeners = { ...this.$listeners, input: this.onInput };
  },
  methods: {
    onInput({ target: { value } }: { target: { value: string } }): void {
      this.$emit('input', value);
    },
  },
});
</script>
