<template>
  <div class="container">
    <div class="off-canvas columns" :class="{ 'off-canvas-sidebar-show': sidebarShow }" >
        
        <a class="off-canvas-toggle btn btn-primary btn-action" @click="showSidebar()">
          <slot v-if="$slots.icon" name="icon"></slot>
          <icon v-else :type="icon"></icon>
        </a>

        <div class="off-canvas-sidebar column col-2" :class="{ 'active': active }">
            <slot name="sidebar"></slot>
        </div>

        <a class="off-canvas-overlay" @click="hideSidebar()"></a>

        <div class="off-canvas-content column col-9 col-mr-auto">
            <slot name="content"></slot>
            <slot></slot>
        </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import vue from "vue";
import Icon, { Navigation, Type as IconType } from "./Icon";

@Component({
  components: {
    icon: Icon
  }
})
export default class extends vue {
  @Prop({ default: Navigation.menu })
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
