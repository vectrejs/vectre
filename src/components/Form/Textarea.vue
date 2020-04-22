<template>
  <textarea
    v-on="listeners"
    :placeholder="placeholder"
    :value="value"
    :disabled="disabled"
    class="form-input"
    @input="onInput"
  ></textarea>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Textarea',
  props: {
    value: String,
    disabled: Boolean,
  },
  data: () => ({
    listeners: {},
  }),
  methods: {
    onInput({ target: { value } }: { target: { value: string } }) {
      this.$emit('input', value);
    },
  },
  computed: {
    placeholder(): string | undefined {
      return (
        this.$attrs.placeholder ||
        (this.$slots.default && this.$slots.default[0].text)
      );
    },
  },
  created() {
    this.listeners = { ...this.$listeners, input: this.onInput };
  },
});
</script>
