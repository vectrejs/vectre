<template>
  <textarea v-on="listeners" class="form-input" @input="onInput" v-model="value">
  </textarea>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: String,
    },
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
