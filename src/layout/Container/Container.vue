<template>
  <div class="container" :class="cssClass">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Grids, Grid } from './Grid';

@Component
export default class extends Vue {
  @Prop(String)
  public grid: Grid;

  get cssClass(): string[] {
    return [Grids[this.grid]];
  }
}
</script>
