<template>
  <figure class="avatar" :class="cssClass" :style="cssStyle" :data-initial="initials && initials.trim().substring(0, 2)">
    <img v-if="src" :src="src" :alt="alt" />
    <img v-if="icon" :src="icon" class="avatar-icon" />
    <i v-if="presence && !icon" :class="presence" class="avatar-presence" /> 
  </figure>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Size } from './Size';
import { Presence } from './Presence';

@Component
export default class extends Vue {
  @Prop(String) private size: Size | string;

  @Prop(String) private src: string;

  @Prop(String) private initials: string;

  @Prop(String) private background: string;

  @Prop(String) private color: string;

  @Prop(String) private alt: string;

  @Prop(String) private presence: Presence;

  @Prop(String) private icon: string;

  private get cssStyle() {
    return {
      color: this.color,
      background: this.background,
    };
  }

  private get cssClass() {
    return [Size[this.size as any] || this.size];
  }
}
</script>

<style lang="scss">
figure.avatar + figure.avatar {
  margin-left: 0.4rem;
}
</style>

