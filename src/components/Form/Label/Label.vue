<template>
  <label :class="cssClass">
    <slot />
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import { LabelSize } from './LabelSize';

export default Vue.extend({
  props: {
    size: {
      type: String,
      validator: (v: string) => !v || Object.keys(LabelSize).includes(v),
    },
  },

  computed: {
    cssClass(): string[] {
      return ['form-label', LabelSize[this.size as keyof typeof LabelSize] || ''];
    },
  },
});
</script>
