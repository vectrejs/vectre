<template>
  <span class="label" :class="cssClass">
    <slot />
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { TagType, TagTypes } from './Type';

@Component({
  name: 'Tag',
})
export default class Label extends Vue {
  @Prop(String)
  public type: TagType;

  @Prop(Boolean)
  public rounded: boolean;

  public get cssClass(): string[] {
    return [TagTypes[this.type], this.rounded ? 'label-rounded' : ''];
  }
}
</script>

<style lang="scss">
.label + .label {
  margin-left: 0.3rem;
}
</style>
