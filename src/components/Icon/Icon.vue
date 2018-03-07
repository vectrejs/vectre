<template>
  <i class="icon" :class="cssClass" :style="cssStyle"></i>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import vue from "vue";
import Type, * as Icons from "./Type";
import IconSize from "./Size";

@Component
export default class Icon extends vue {
  @Prop({ required: true })
  private type: Type;

  @Prop()
  private size: IconSize | string;

  private get cssStyle(): object {
    return {
      'font-size': IconSize[<any>this.size] || this.size,
    }
  }

  private get cssClass(): [string, string] {
    return [
      IconSize[<any>this.size] || this.size,
      Icons.Navigation[<any>this.type] || Icons.Action[<any>this.type] || Icons.Objects[<any>this.type] || this.type,
    ]
  }
}
</script>
