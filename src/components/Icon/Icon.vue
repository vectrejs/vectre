<template>
  <i class="icon" :class="cssClass" :style="cssStyle"></i>
</template>

<script lang="ts">
import vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IconSize, IconSizes } from './Size';
import { IconType, Icons } from './Type';

@Component
export default class Icon extends vue {
  @Prop({ type: String, required: true })
  public type: string;

  @Prop(String)
  public size: string;

  public get cssStyle(): Record<string, string | number | boolean> {
    return {
      'font-size': IconSizes[this.size as IconSize] || this.size,
    };
  }

  public get cssClass(): string[] {
    return [IconSizes[this.size as IconSize] || this.size, Icons[this.type as IconType] || this.type];
  }
}
</script>
