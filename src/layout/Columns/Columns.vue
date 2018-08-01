<template>
  <div class="columns" :class="cssClass">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop(Boolean) private gapless: boolean;

  @Prop(Boolean) private oneline: boolean;

  public get cssClass(): string[] {
    return [
      this.gapless ? "col-gapless" : "",
      this.oneline ? "col-oneline" : ""
    ];
  }
}
</script>
