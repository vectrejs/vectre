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
      'font-size': Size[<any>this.size] || this.size,
    }
  }

  private get cssClass(): [string, string] {
    return [
      Size[<any>this.size] || this.size,
      Names.Navigation[<any>this.type] || Names.Action[<any>this.type] || Names.Objects[<any>this.type] || this.type,
    ]
  }
}
</script>
