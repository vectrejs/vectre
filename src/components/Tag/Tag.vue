<template>
  <span class="label" :class="cssClass">
    <slot />
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Type, Types } from './Type';

@Component({
  name: 'tag',
})
export default class Label extends Vue {
  @Prop(String)
  public type: Type;

  @Prop(Boolean)
  public rounded: boolean;

  public get cssClass(): string[] {
    return [Types[this.type], this.rounded ? 'label-rounded' : ''];
  }
}
</script>

<style lang="scss">
.label + .label {
  margin-left: 0.3rem;
}
</style>
