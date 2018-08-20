<template>
  <div class="panel">
    <div v-if="$slots.header" class="panel-header">
      <slot name="header" />
    </div>
    <div v-if="$slots.nav" class="panel-nav">
      <slot name="nav" />
    </div>
    <div v-if="$slots.body" class="panel-body">
      <slot name="body" />
    </div>
    <div v-if="$slots.footer" class="panel-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
});
</script>
