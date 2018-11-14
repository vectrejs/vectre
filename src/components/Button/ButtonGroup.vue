<template>
  <div class="btn-group" :class="cssClass">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';

export default Vue.extend({
  props: {
    block: Boolean,
  },
  computed: {
    cssClass(): string[] {
      return [this.block ? 'btn-group-block' : ''];
    },
  },
});
</script>
