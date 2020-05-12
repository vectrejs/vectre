<template>
  <div class="columns" :class="cssClass">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop(Boolean)
  public gapless: boolean;

  @Prop(Boolean)
  public oneline: boolean;

  public get cssClass(): string[] {
    return [this.gapless ? 'col-gapless' : '', this.oneline ? 'col-oneline' : ''];
  }
}
</script>
