<template>
  <i class="icon" :class="cssClass" :style="cssStyle"></i>
</template>

<script lang="ts">
import vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Size, Sizes } from './Size';
import { Type, Icons } from './Type';

@Component
export default class Icon extends vue {
  @Prop({ type: String, required: true })
  public type: string;

  @Prop(String)
  public size: string;

  public get cssStyle(): object {
    return {
      'font-size': Sizes[this.size as Size] || this.size,
    };
  }

  public get cssClass(): string[] {
    return [Sizes[this.size as Size] || this.size, Icons[this.type as Type] || this.type];
  }
}
</script>
