<template>
  <figure
    class="avatar"
    :class="cssClass"
    :style="cssStyle"
    :data-initial="initials && initials.trim().substring(0, 2)"
  >
    <img v-if="src" :src="src" :alt="alt" />
    <img v-if="icon" :src="icon" class="avatar-icon" />
    <i v-if="presence && !icon" :class="presence" class="avatar-presence" />
  </figure>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Size, Sizes } from './Size';
import { Presence } from './Presence';

@Component
export default class Avatar extends Vue {
  @Prop(String)
  public size: Size;

  @Prop(String)
  public src: string;

  @Prop(String)
  public initials: string;

  @Prop(String)
  public background: string;

  @Prop(String)
  public color: string;

  @Prop(String)
  public alt: string;

  @Prop(String)
  public presence: Presence;

  @Prop(String)
  public icon: string;

  public get cssStyle(): { [key: string]: string | undefined } {
    return {
      color: this.color,
      background: this.background,
    };
  }

  public get cssClass(): string[] {
    return [Sizes[this.size] || this.size];
  }
}
</script>

<style lang="scss">
figure.avatar + figure.avatar {
  margin-left: 0.4rem;
}
</style>
