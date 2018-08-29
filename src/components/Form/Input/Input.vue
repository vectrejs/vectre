<template>
  <div v-if="leftIcon" class="has-icon-left">
    <input type="text" class="form-input" placeholder="...">
    <i class="form-icon icon"></i>
  </div>

  <div v-else-if="rightIcon" class="has-icon-right">
    <input type="text" class="form-input" placeholder="">
    <i class="form-icon icon"></i>
  </div>

  <input v-else v-on="$listeners" :class="cssClass"  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Size } from './Size';

export default Vue.extend({
  props: {
    size: {
      type: String,
      validator: (size: string) => Object.keys(Size).includes(size),
    },
  },
  computed: {
    cssClass(): string[] {
      return [
        'form-input',
        this.size ? Size[this.size as any] : '',
      ];
    },
  },
});
</script>
