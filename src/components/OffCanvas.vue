<template>
    <div class="off-canvas" :class="{ 'off-canvas-sidebar-show': sidebarShow }" >

        <div class="off-canvas-toggle">
          <a class="btn btn-primary btn-action" @click="showSidebar()">
            <slot v-if="$slots.icon" name="icon"></slot>
            <icon v-else :type="icon"></icon>
          </a>
        </div>

        <div class="off-canvas-sidebar" :class="{ 'active': active }">
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
import {
  Icon,
  Navigation as IconNavigation,
  IconType,
} from '@components/Icon';

import vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
    icon: Icon,
  },
})
export default class extends vue {
  @Prop({ default: IconNavigation.menu })
  private icon: IconType;

  @Prop({ default: true, type: Boolean })
  private sidebarShow: boolean;

  private active: boolean = false;

  public showSidebar(): void {
    this.active = true;
  }

  public hideSidebar(): void {
    this.active = false;
  }
}
</script>
