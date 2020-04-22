<template>
  <label :class="cssClass">
    <slot />
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import { LabelSizes, LabelSize } from './LabelSize';

export default Vue.extend({
  name: 'FormLabel',
  props: {
    size: {
      type: String,
      validator: (v: string) => !v || Object.keys(LabelSizes).includes(v),
    },
  },

  computed: {
    cssClass(): string[] {
      return ['form-label', LabelSizes[this.size as LabelSize] || ''];
    },
  },
});
</script>
