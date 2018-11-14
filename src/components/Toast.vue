<template>
  <transition name="fade">
    <div v-if="shown" class="toast" :class="typeClass">
      <icon v-if="icon" :type="icon" />
      <button v-if="closeable" class="btn btn-clear float-right" @click="close()"></button>
      <slot></slot>
    </div>
  </transition>
</template>


<script lang="ts">
import vue from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { IconType } from '@components/Icon';

@Component
export default class extends vue {
  @Prop(String)
  public type: string;

  @Prop(Number)
  public autoclose: number;

  @Prop(Boolean)
  public closeable: boolean;

  @Prop(String)
  public icon: IconType;

  private shown: boolean = true;

  public get typeClass(): string {
    return 'toast-' + this.type;
  }

  public get iconClass(): string {
    return 'icon-' + this.icon;
  }

  public mounted(): void {
    if (this.autoclose) {
      setTimeout(() => (this.shown = false), this.autoclose);
    }
  }

  @Emit('closed')
  public close(): void {
    this.shown = false;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
