<template>
  <span class="step-item">
    <a>
      <slot />
    </a>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Step',
});
</script>

<style>
.step .step-item a {
  user-select: none;
}
</style>
