<template>
  <div class="form-input-hint" :class="{error}">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    error: Boolean,
  },
});
</script>

<style lang="scss">
.form-input-hint.error { 
  display: none; 
}

// Hides all hints on error
.form-group.has-error .form-input-hint {
  display: none;
}

// Except hints with errors
.form-group.has-error .form-input-hint.error {
  display: initial;
}
</style>
