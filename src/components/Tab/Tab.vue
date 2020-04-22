<template>
  <span class="tab-item">
    <a v-badge="badge">
      <slot />
    </a>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Tab',
  props: {
    badge: {
      type: [String, Number],
    },
  },
});
</script>

<style>
.tab .tab-item {
  cursor: pointer;
  user-select: none;
}
</style>