<template>
  <off-canvas>
    <!-- <anchored-menu slot="sidebar" :routes="routes"/> -->
    <template slot="sidebar">
      <div class="logo">
        <img :src="require('@kitchen/img/logo.svg')" />
      </div>
      <mnu :routes="routes" />
    </template>
    <router-view slot="content" />
  </off-canvas>
</template>

<script lang="ts">
import vue from 'vue';
import { Component } from 'vue-property-decorator';
import { AnchoredMenu } from 'vue-anchored-menu';
import Prism from 'vue-prism-component';
import router, { routes } from './router';

import './assets/';

import VectrePlugin from '../src/main';
import ComponentView from '@kitchen/component/Component.vue';
import Mnu from '@kitchen/component/Menu.vue';

// Register common components
vue.component('prism', Prism);
vue.component('component-view', ComponentView);
vue.use(VectrePlugin);

@Component({
  router,
  components: {
    AnchoredMenu,
    Mnu,
  },
})
export default class extends vue {
  private routes = routes;
}
</script>


<style lang="scss" scoped>
.off-canvas {
  /deep/ &-sidebar {
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
      top: .85rem;

      img {
        display: inline-block;
        height: auto;
        width: 7rem;
      }
    }
  }
}
</style>