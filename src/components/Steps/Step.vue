<template>
  <span class="step-item">
    <a><slot /></a>
  </span>
</template>

<script lang="tsx">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style>
.step .step-item a {
  user-select: none;
}
</style>
