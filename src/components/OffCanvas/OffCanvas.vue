<template>
  <div class="off-canvas" :class="{ 'off-canvas-sidebar-show': sidebarShow }">
    <div class="off-canvas-toggle">
      <a class="btn btn-primary btn-action" @click="showSidebar()">
        <slot v-if="$slots.icon" name="icon"></slot>
        <icon v-else :type="icon"></icon>
      </a>
    </div>

    <div class="off-canvas-sidebar" :class="{ active: active }">
      <slot name="sidebar"></slot>
    </div>

    <a class="off-canvas-overlay" @click="hideSidebar()"></a>

    <div class="off-canvas-content">
      <slot name="content"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon, IconNavigation, IconType } from '../Icon';

import vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'OffCanvas',
  components: {
    icon: Icon,
  },
})
export default class OffCanvas extends vue {
  @Prop({ default: IconNavigation.menu })
  public icon: IconType;

  @Prop({ default: true, type: Boolean })
  public sidebarShow: boolean;

  private active = false;

  public showSidebar(): void {
    this.active = true;
  }

  public hideSidebar(): void {
    this.active = false;
  }
}
</script>
