<template>
  <div class="container" :class="cssClass">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Grid } from './Grid';

@Component
export default class extends Vue {
  @Prop(String) private grid: Grid;

  get cssClass(): string[] {
    return [Grid[this.grid as any]];
  }
}
</script>
