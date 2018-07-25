<template>
  <figure class="avatar" :class="cssClass" :data-initial="initial" :style="cssStyle">
    <img v-if="src" :src="src" :alt="alt" />
  </figure>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Size } from './Size';

@Component
export default class extends Vue {
  @Prop()
  private size: Size | string;

  @Prop()
  private src: string;
  
  @Prop()
  private initial: string;

  @Prop()
  private background: string;

  @Prop()
  private color: string;

  @Prop()
  private alt: string;

  private get cssStyle() {
    return {
      color: this.color,
      background: this.background,
    }
  }

  private get cssClass() {
    return [
      Size[<any>this.size] || this.size,
    ]
  }
}
</script>
