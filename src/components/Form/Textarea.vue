<template>
  <textarea 
    v-on="listeners" 
    :value="value"
    :disabled="disabled" 
    class="form-input" 
    @input="onInput" 
  >
  </textarea>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
  created() {
    this.listeners = { ...this.$listeners, input: this.onInput };
  },
});
</script>
