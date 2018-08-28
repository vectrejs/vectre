<template>
  <div class="btn-group" :class="cssClass">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    block: {
      type: Boolean,
    },
  },
  computed: {
    cssClass(): string[] {
      return [this.block ? 'btn-group-block' : ''];
    },
  },
});
</script>
