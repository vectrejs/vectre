<template>
  <off-canvas ref="offCanvas">
    <template slot="sidebar">
      <div class="logo">
        <img :src="require('@kitchen/img/logo.svg')" />
      </div>
      <mnu :routes="routes" @checked="closeSidebar" />
    </template>

    <router-view slot="content" />
  </off-canvas>
</template>

<script lang="ts">
import vue from 'vue';
import { Component } from 'vue-property-decorator';
import router, { routes } from './router';

import './assets/';

import VectrePlugin from '../src/main';
import ComponentView from '@kitchen/component/Component.vue';
import Mnu from '@kitchen/component/Menu.vue';

// Register common components
vue.component('component-view', ComponentView);
vue.use(VectrePlugin);

@Component({
  router,
  components: {
    Mnu,
  },
})
export default class extends vue {
  private routes = routes;

  public closeSidebar() {
    (this.$refs.offCanvas as any).hideSidebar();
  }
}
</script>


<style lang="scss" scoped>
@media (max-width: 960px) {
  /deep/ .off-canvas-content.col-9 {
    padding-top: 3rem;
  }
}

/deep/ .off-canvas {
  &-toggle {
    top: 0;
    left: 0;
    padding: 0.5rem 1rem;
    position: fixed;
    width: 100%;
    background: rgba(248, 249, 250, 0.65);
    z-index: 100;
  }

  &-sidebar {
    width: 12rem;

    .main-menu {
      position: fixed;
      overflow-y: auto;
      bottom: 1.5rem;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      padding: 0.5rem 1.5rem;
      position: fixed;
      top: 3.5rem;
      width: 12rem;

      .menu-item > a {
        background: 0 0;
        color: #667189;
        display: inline-block;
      }

      .menu .menu-item {
        font-size: 0.7rem;
        padding-left: 1rem;
      }
    }

    .logo {
      left: 1.5rem;
      position: fixed;
      top: 0.85rem;

      img {
        display: inline-block;
        height: auto;
        width: 7rem;
      }
    }
  }

  &-content {
    padding-top: 1.45rem;
  }
}
</style>