<template>
  <span class="step-item">
    <a><slot /></a>
  </span>
</template>

<script lang="tsx">
export default {};
</script>

<style>
.step .step-item a {
  user-select: none;
}
</style>
