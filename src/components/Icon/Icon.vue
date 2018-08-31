<template>
  <i class="icon" :class="cssClass" :style="cssStyle"></i>
</template>

<script lang="ts">
import vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Size from './Size';
import Type, * as Names from './Type';

@Component
export default class Icon extends vue {
  @Prop({ required: true })
  private type: Type;

  @Prop()
  private size: Size | string;

  private get cssStyle(): object {
    return {
      'font-size': Size[this.size as any] || this.size,
    };
  }

  private get cssClass(): [string, string] {
    return [
      Size[this.size as any] || this.size,
      Names.Navigation[this.type as any]
      || Names.Action[this.type as any]
      || Names.Objects[this.type as any]
      || this.type,
    ];
  }
}
</script>
